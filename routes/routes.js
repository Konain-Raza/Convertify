import express from 'express';
import geoip from '../node_modules/geoip-lite/data';


const router = express.Router();  

import { converter } from '../controllers/controllers.js';

router.post("/", converter); 

router.get("/getip", (req, res) => {
    console.log(req)
    
    res.json({
        request: JSON.stringify(req)
    })
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip === "::1" || ip === "127.0.0.1") {
        ip = "8.8.8.8"; // Use a public IP for local testing
    }
    const geo = geoip.lookup("175.107.222.108");
    if (geo) {
        res.json({
            ip: ip,
            countryCode: geo.country
        });
    } else {
        res.status(404).json({ error: "Unable to determine country code" });
    }
});

export default router;
