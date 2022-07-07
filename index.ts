import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import { postBattle } from "./controllers/battleController.js"; 
import { getRanking } from "./controllers/rankingController.js"; 

const app = express();
app.use(express.json());

app.post("/battle", postBattle) 
app.get("/ranking", getRanking) 

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})