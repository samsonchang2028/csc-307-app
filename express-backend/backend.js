import express from "express";
import cors from "cors";


const app = express();
const port = 8000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res )=>{
    res.send("Hello world!");
});
app.listen(port, ()=> {
    console.log(`example app listening at http://localhost:${port}`)
});
