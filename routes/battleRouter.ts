import { Router } from "express";

import { postBattle } from "../controllers/battleController.js";

const battleRouter = Router();

battleRouter.post("/battle", postBattle);

export default battleRouter;