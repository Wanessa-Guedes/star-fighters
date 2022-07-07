import { Request, Response } from "express";

import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(req: Request, res: Response){
        let rankFighters: Object = {};
        let rank = await rankingRepository.selectRank();
        rankFighters = {figthers: rank};
        return res.status(200).send(rankFighters);
} 