import CurrencyConverter from "currency-converter-lt";
import geoip from "geoip-lite";
import countryToCurrency from "country-to-currency";

const currencyConverter = new CurrencyConverter();

const converter = async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from) {
    return res.status(400).send({ error: '"from" parameter is required' });
  }

  if (!to) {
    return res.status(400).send({ error: '"to" parameter is required' });
  }

  try {
    const response = await currencyConverter
      .from(from)
      .to(to)
      .amount(amount || 1)
      .convert();

    res.status(200).send({ [to]: response });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error: " + error.message });
  }
};

const getIP = async (req, res) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }

    const geo = geoip.lookup(ip);

    if (geo) {
      const countryCode = geo.country;
      const currencyCode = countryToCurrency[countryCode] || "Unknown";

      res.status(200).json({
        ip: ip,
        countryCode: countryCode,
        currencyCode: currencyCode,
      });
    } else {
      res.status(404).json({ error: "Unable to determine country code" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export { converter, getIP };
