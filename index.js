import express from "express";
import cors from "cors";
import geoip from "geoip-lite";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.json({
    message: "Convertify: Currency Converter API",
    instructions: {
      convert: "To convert currencies, use the /convert endpoint with a POST request.",
      requestBody: {
        from: "USD",
        to: "PKR",
        amount: "Optional",
      },
      exampleRequest: {
        method: "POST",
        url: "/api/v1/convert",
        body: { from: "USD", to: "PKR" },
      },
      exampleResponse: {
        PKR: "Conversion rate will vary. Example: 276.25",
      },
    },
  });
});

app.get("/getip", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.headers["x-real-ip"] || "127.0.0.1";
  console.log("Detected IP:", ip);
  const ipForGeo = ip === "::1" || ip === "127.0.0.1" ? "8.8.8.8" : ip;
  const geo = geoip.lookup(ipForGeo);

  if (geo) {
    console.log("GeoIP Lookup Result:", geo);
    res.status(200).json({ ip: ipForGeo, countryCode: geo.country });
  } else {
    res.status(404).json({ error: "Unable to determine country code" });
  }
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server: ", error.message);
  }
};

startServer();
