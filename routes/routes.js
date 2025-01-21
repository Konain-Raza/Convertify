import express from "express";

const router = express.Router();

import { convertRate} from "../controllers/controllers.js";

router.post("/convert", convertRate);


export default router;
