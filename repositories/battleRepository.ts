import db from "./../config/db.js";

async function insertBattle(user: string, n1: number, n2: number, n3: number) {
    await db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
    [user,n1,n2,n3])
}

export const battleRepository = {
    insertBattle
}