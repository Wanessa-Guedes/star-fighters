import { Request, Response } from "express";
import axios, { AxiosPromise } from "axios";

import db from "./../config/db.js";

export async function postBattle(req: Request, res: Response){
    const {firstUser, secondUser}: {firstUser: string, secondUser: string} = req.body;

    try {
        const firstUserData = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        const secondUserData = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
        const userOneData = firstUserData.data?.filter((stars: any) => stars.stargazers_count !== 0);
        const userTwoData = secondUserData.data?.filter((stars: any) => stars.stargazers_count !== 0);
        let countStarsOne: number = 0;
        let countStarsTwo: number = 0;
        let finalDuel: Object = {
            "winner": null,
            "loser": null,
            "draw": true
        } 
        userOneData?.map((userOneStars: any) => {
            countStarsOne += userOneStars.stargazers_count;
        })

        userTwoData?.map((userTwoStars: any) => {
            countStarsTwo += userTwoStars.stargazers_count;
        })

        if(countStarsOne > countStarsTwo){
            finalDuel = {
                "winner": firstUser,
                "loser": secondUser,
                "draw": false
            } 
            
            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [firstUser, 1, 0, 0])

            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [secondUser, 0, 1, 0])

            return res.send(finalDuel).status(200);
        } else if (countStarsOne < countStarsTwo) {
            finalDuel = {
                "winner": secondUser,
                "loser": firstUser,
                "draw": false
            } 
            
            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [secondUser, 1, 0, 0])

            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [firstUser, 0, 1, 0])

            return res.send(finalDuel).status(200);
        } else {

            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [secondUser, 0, 0, 1])

            await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
            [firstUser, 0, 0, 1])

            res.send(finalDuel).status(200);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 