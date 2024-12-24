import express from 'express';
const router = express.Router();  

import { converter } from '../controllers/controllers.js';

router.post("/", converter); 
router.get("/getip", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.headers["x-real-ip"] || "127.0.0.1";
    console.log("Detected IP:", ip);
    const ipForGeo = ip === "::1" || ip === "127.0.0.1" ? "8.8.8.8" : ip;
    console.log(ipForGeo);
    res.json({
      ip: ipForGeo
    })

  });


export default router;
