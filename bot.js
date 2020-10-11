require("dotenv").config();

const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js");

manager.spawn();
manager.on("shardCreate", shard => console.log(`Create shard ${shard.id}`));