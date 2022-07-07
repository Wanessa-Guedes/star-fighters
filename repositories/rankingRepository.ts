import db from "./../config/db.js";

async function selectRank() {
    const rank = await db.query(`SELECT fighters.username, SUM(fighters.wins) as wins, 
    SUM(fighters.losses) as losses, SUM(fighters.draws) as draws
    FROM fighters
    GROUP BY fighters.username
    ORDER BY wins DESC, draws DESC, losses`);

    return rank.rows
}

export const rankingRepository = {
    selectRank
}