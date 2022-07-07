//import db from "./../config/db.js";
import { battleRepository } from "../repositories/battleRepository.js";

async function insertBattleInfo(firstUser: string, secondUser: string, firstUserData, secondUserData) {

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
            await battleRepository.insertBattle(firstUser, 1, 0, 0)
            await battleRepository.insertBattle(secondUser, 0, 1, 0)

            return finalDuel;

        } else if (countStarsOne < countStarsTwo) {
            finalDuel = {
                "winner": secondUser,
                "loser": firstUser,
                "draw": false
            } 
            await battleRepository.insertBattle(secondUser, 1, 0, 0)
            await battleRepository.insertBattle(firstUser, 0, 1, 0)

            return finalDuel;
        } else {
            await battleRepository.insertBattle(firstUser, 0, 0, 1)
            await battleRepository.insertBattle(secondUser, 0, 0, 1)
            return finalDuel;
        }
}

export const battleServices = {
    insertBattleInfo
} 