const clientPromise = require('./mongodb');

const client = await clientPromise;
const db = client.db("data");
const botInfo = await db.collection("bots").findOne({ server: process.env['GUILD_ID'] });

module.exports = botInfo;