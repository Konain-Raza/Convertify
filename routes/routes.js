import express from 'express';
const router = express.Router();  

import { converter } from '../controllers/controllers.js';

router.post("/", converter); 


export default router;
