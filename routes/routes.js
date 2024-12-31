import express from "express";

const router = express.Router();

import { convertCurrency} from "../controllers/controllers.js";

router.post("/convert", convertCurrency);


export default router;
