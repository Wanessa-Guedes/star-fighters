import { Request, Response } from "express";

import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(req: Request, res: Response){
    try {
        let rankFighters: Object = {};
        let rank = await rankingRepository.selectRank();
        rankFighters = {figthers: rank};
        res.send(rankFighters).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 