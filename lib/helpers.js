const clientPromise = require('./mongodb');
const fs = require('node:fs');
const path = require('node:path');
const tasks = require('../tasks.js');

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
async function purgeDB(collection) {
    const client = await clientPromise;
    const db = client.db("data");
    await db.collection(collection).drop();
    return;
}
async function mountHandlers(client, memberInfo) {
    const handlersPath = path.join(__dirname, '../handlers');
    const handlerFile = fs.readdirSync(handlersPath).find(file => file == `${tasks[memberInfo.task].handler.identifier}.js`);
    const filePath = path.join(handlersPath, handlerFile);
    
    const listeners = require(filePath);
    listeners.forEach((listener) => {
    const callback = (...args) => listener.execute(memberInfo, ...args);
    if (listener.once) {
        client.once(listener.name, callback);
    } else {
        client.on(listener.name, callback);
    }
    handlerInfo.push({
        'name': listener.name,
        'user': memberInfo.id,
        'callback': callback,
    });
    console.log(`Loaded ${listener.name} listener`);
    });
    console.log(`All events for ${memberInfo.username} loaded`);
}
async function checkHeart(botClient) {
    const client = await clientPromise;
    const db = client.db("data");
    const info = await db.collection("bots").findOne({ server: process.env['GUILD_ID'] });
    if (info && info.heart !== heartInfo.id) {
        console.log('New process detected, handing over control...');
        botClient.destroy();
        clearInterval(heartInfo.interval);
        return;
        //process.exit(0);
    } else {
        return;
    }
}
async function setHeart(uuid = crypto.randomUUID()) {
    const client = await clientPromise;
    const db = client.db("data");
    await db.collection("bots").updateOne({ server: process.env['GUILD_ID'] }, { $set: { heart: uuid } });
    return uuid;
}

module.exports = {
    botInfo,
    playerInfo,
    setGameState,
    failPlayer,
    insertDB,
    purgeDB,
    mountHandlers,
    checkHeart,
    setHeart,
}