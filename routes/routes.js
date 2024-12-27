import express from "express";

const router = express.Router();

import { convertCurrency, getLocation } from "../controllers/controllers.js";

router.post("/exchange", convertCurrency);

router.get("/location", getLocation);

export default router;
