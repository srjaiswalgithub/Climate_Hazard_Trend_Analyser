// server/app.js
import express from 'express';
import cors from 'cors';
import climateRoutes from './routes/climateRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin:process.env.FRONTEND_URL,
  credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/climate', climateRoutes);



export default app;
