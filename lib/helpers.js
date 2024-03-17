const clientPromise = require('./mongodb');

async function botInfo() {
    const client = await clientPromise;
    const db = client.db("data");
    const info = await db.collection("bots").findOne({ server: process.env['GUILD_ID'] });
    return info;
}
async function playerInfo(player) {
    const client = await clientPromise;
    const db = client.db("data");
    if (player) {
        const info = await db.collection("players").findOne({ id: player });
        return info;
    } else {
        const info = await db.collection("players").find().toArray();
        return info;
    }
}
async function setGameState(state) {
    const client = await clientPromise;
    const db = client.db("data");
    await db.collection("bots").updateOne({ server: process.env['GUILD_ID'] }, { $set: { isGame: state } });
    return;
}
async function failPlayer(player) {
    const client = await clientPromise;
    const db = client.db("data");
    await db.collection("players").updateOne({ id: player }, { $set: { failed: true } });
    return;
}
async function insertDB(collection, document) {
    const client = await clientPromise;
    const db = client.db("data");
    await db.collection(collection).insertOne(document);
    return;
}

module.exports = { botInfo, setGameState, playerInfo, insertDB, failPlayer }