import express from 'express';
import analyzeClimate from '../controllers/climateController.js';
const router = express.Router();

router.post('/analyze', analyzeClimate);


export default router;
