import express from "express";

const router = express.Router();

import { converter, getIP } from "../controllers/controllers.js";

router.post("/", converter);

router.get("/getip", getIP);

export default router;
