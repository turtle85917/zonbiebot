const { Client, Collection } = require("discord.js"), { readdirSync } = require("fs"), client = new Client(), Myriad = require('./src/tools/myriad');

Array.prototype.remove = function(item) {
    const idx = this.indexOf(item)
    if (idx != -1) this.splice(idx, 1)
    return this
}

Array.prototype.shuffle = function() {
    return this.sort(() => Math.random() - 0.5);
}

client.login("BotToken")

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");
client.myriad = new Myriad(8081)
//client.db = knex({client: "mysql", connection: {host: "pikodev.studio", user: "flora", password: "qhfkvmffj", database: "zonbie", port: 3306}})
//client.db = knex({client: "sqlite3", connection: {filename: "./src/db/data.db"}})

readdirSync('./src/event/').forEach(file => {
	const event = require(`./src/event/${file}`);
	const eventName = file.split('.')[0];
	client.on(eventName, event.bind(null, client))
})

process.on("exit", () => {
    console.log("봇이 꺼짐닙다.")
})
