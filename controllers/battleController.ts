import { Request, Response } from "express";
import axios from "axios";

import { battleServices } from "../services/battleServices.js";

export async function postBattle(req: Request, res: Response){
    const {firstUser, secondUser}: {firstUser: string, secondUser: string} = req.body;

        const firstUserData = await axios.get(`https://api.github.com/users/${firstUser}/repos`)
                                            .catch(error => {throw {
                                                type: error.response.data.message}});
        const secondUserData = await axios.get(`https://api.github.com/users/${secondUser}/repos`)
                                            .catch(error => {throw {
                                                type: error.response.data.message}});
        let battleInfo = await battleServices.insertBattleInfo(firstUser, secondUser, firstUserData, secondUserData)
        return res.status(200).send(battleInfo);
} 