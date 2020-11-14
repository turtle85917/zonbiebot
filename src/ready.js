module.exports = async (client) => {
    const ops = require('../../ops'), {ErelaClient} = require("erela.js");
    console.log(`${ops.table(client)}\nLogin ${client.user.username}\n----------------------------`);
    client.user.setActivity("\"존비야 도움말\"을 입력")
    ops.MyBot.update(client.guilds.cache.size).then(e => console.log(e.code || e)).catch(e => console.error(e.message))
}