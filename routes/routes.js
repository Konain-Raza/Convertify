import express from 'express';
const router = express.Router();  

import { converter } from '../controllers/controllers.js';

router.post("/", converter); 

router.get("/getip", (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip === "::1" || ip === "127.0.0.1") {
        ip = "8.8.8.8";
    }
    console.log("Detected IP:", ip);
    res.json({ ip });
});

export default router;
