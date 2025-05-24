import app from './app.js';
import path from 'path';
import express from 'express';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get((req,res)=>{
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});