const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "reload",
    aliases: ["리로드", "ㄱ디ㅐㅁㅇ", "ffe", "ㄹㄹㄷ", "flfhem"],
    category: "owner",
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setTitle(`${client.emojis.cache.get("677129501645209601")} 모든 파일을 리로드 중... (${client.commands.size}개)`).setColor(0x00ff00)
        const m = await message.channel.send(embed);

        readdirSync("./commands/").forEach(dir => {
            readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js")).forEach(file => {
                let pull = require(`../${dir}/${file}`);

                if (pull.name) {
                    delete require.cache[require.resolve(`../${dir}/${file}`)];
                    client.commands.set(pull.name, pull)
                }

                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name))
            })
        })
        
        m.edit(embed.setTitle(`✅ 모든 파일을 리로드 완료! (${client.commands.size}개)`))
    }
}