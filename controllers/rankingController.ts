import { Request, Response } from "express";

import db from "./../config/db.js";

export async function getRanking(req: Request, res: Response){
    try {
        const rank = await db.query(`SELECT fighters.username, SUM(fighters.wins) as wins, 
                                    SUM(fighters.losses) as losses, SUM(fighters.draws) as draws
                                    FROM fighters
                                    GROUP BY fighters.username
                                    ORDER BY wins DESC, draws DESC`);
        
        let rankFighters: Object = {};

        rankFighters = {figthers: rank.rows};
        
        res.send(rankFighters).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 