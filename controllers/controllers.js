import CurrencyConverter from "currency-converter-lt";
const currencyConverter = new CurrencyConverter();

const converter = async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from) {
    return res.status(400).send({ error: '"from" parameter is required' });
  } else if (!to) {
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

export { converter };
