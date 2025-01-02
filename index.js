import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send(`
  <div style="font-family: 'Arial', sans-serif; padding:10px;">
    <h1>🌍 Convertfy API: Currency Made Easy! 💸</h1>

    <p>Your personal currency wizard is here! 🧙‍♂️ The API is live and ready to help you convert any currency from one magical code to another. ✨</p>
    
    <h3>💸 Currency Conversion</h3>
    <p>Want to know how much your currency is worth in another? No problem! Just use the <strong>POST /convert</strong> endpoint, and we'll do the rest. 🔮💰</p>
    
    <h4>Request Body 📝</h4>
    <pre>
{
  "from": "USD",  // Currency you want to convert from (e.g., USD for US Dollar)
  "to": "EUR",    // Currency you want to convert to (e.g., EUR for Euro)
  "amount": 1000   // The amount you want to convert (optional, defaults to 1 if not provided)
}
    </pre>
    
    <h4>Response 💰</h4>
    <pre>
{
  rates: 966.28 EUR   // The converted amount in the target currency (e.g., EUR)
}
    </pre>

    <h3>🧑‍💻 How it Works</h3>
    <p>It’s super easy! Tell us the currency you want to convert from and the currency you want to convert to, along with the amount (optional). Don’t worry if you forget to mention the amount—by default, we assume you mean 1 unit of your "from" currency. 😎💵</p>
    
    <h3>🤖 We’re Here for You</h3>
    <p>Our API is always ready for action! Feel free to make as many requests as you want, and if you need help or have any questions, we’re just an email away at <strong>konainraza105  @gmail.com</strong> 📧.</p>

    <p>Start converting and watch your money magically transform! ✨💵</p>

    <h3>Made with 💖 by Konain Raza</h3>
  </div>
`);
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
