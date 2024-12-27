import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { authenticateBearerToken } from "./helper/authHelper.js";
import router from "./routes/routes.js";
import dotenv from "dotenv"

const app = express();  
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use("/api/v1/", authenticateBearerToken, router);

app.get("/", async(req, res) => {
const hashedApiKey = await bcrypt.hash("Objects#1234!", 10);
  res.json({
    key: hashedApiKey,
    message: "Convertify: Currency Converter API",
    instructions: {
      convert:
        "To convert currencies, use the /convert endpoint with a POST request.",
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
