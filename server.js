import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req,res)=>{
    res.send("Service is up..")
});

app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`)
});