import express from "express";

const app = express();
const port = 9000;

app.get('/', (req,res)=>{
    res.send("Service is up..")
});

app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`)
});