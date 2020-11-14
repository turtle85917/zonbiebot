const { MessageEmbed, MessageAttachment } = require("discord.js");
const ops = require('../../ops')
let prefix = ops.prefix;
module.exports = async (client, message) => {
	try {
		if (message.mentions.users.some(x => x.id == client.user.id) && !message.author.bot) message.channel.send(`우어.. 내 이름은 존비봇이다.. 접두사는 \`${(await client.db("guilds").where('id', message.guild.id))[0] ? (await client.db("guilds").where('id', message.guild.id))[0].prefix : "존비야 "}\`이다..`);
		if (message.author.bot || message.system || !message.content.startsWith(prefix)) return;
		if (message.content == ops.prefix) {
			console.log(`누군가가 ${client.user.username}(을)를 불렀다..`)
			return message.channel.send("우어.. ");
		}
		const args = message.content.slice(prefix.length).trim().split(/ +/g),
			cmd = args.shift().toLowerCase(),
			command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

		if (command) {
			if (command.guildOnly && message.channel.type == "dm") return message.channel.send("해당 명령어는 서버에서만 가능해...");
			if (command.joinOnly && !(await client.db('users').where('id', message.author.id))[0]) return message.channel.send("가입을 먼저 해주세요!")
			else if (command.category === "owner" && (message.author.id !== ops.ownerID)) return message.react("⛔")
			command.run(client, message, args, ops)
		} else {if (message.content == `${ops.prefix} 존비`) return message.channel.send("우어.. 그건 내 이름이다..")
			else if (message.content.startsWith(`${ops.prefix} pyeval`)) return;
			else if (message.content == `${ops.prefix} 명언은?`) return message.channel.send(muyion[ops.random(muyion.length, 0)]);
			else if (require("../../src/json/cat.json")[cmd]) return message.channel.send(require("../../src/json/cat.json")[cmd].replace(/{user}/gi, `<@${message.author.id}>`).replace(/{lv}/gi, ops.random(1, 100)))
			else return message.channel.send("우어어.. 그런 명령어 없다...")
			// client.db('book').where({ title: cmd }).then(async(e) => {
			// 	if (e[0]) {
			// 		await client.db('book').where({ title: cmd }).increment('count', 1)
			// 		return message.channel.send(`${e[0].desc}\n\`\`\`\n${client.users.cache.get(e[0].id) ? `${client.users.cache.get(e[0].id).username}님이 가르쳐 줌.` : "알 수 없는 유저가 가르쳐 줌."}\n\`\`\``);
			// 	}
			// 	else if (message.content == `${ops.prefix} 존비`) return message.channel.send("우어.. 그건 내 이름이다..")
			// 	else if (message.content.startsWith(`${ops.prefix} pyeval`)) return;
			// 	else if (message.content == `${ops.prefix} 명언은?`) return message.channel.send(muyion[ops.random(muyion.length, 0)]);
			// 	else if (require("../../src/json/cat.json")[cmd]) return message.channel.send(require("../../src/json/cat.json")[cmd].replace(/{user}/gi, `<@${message.author.id}>`).replace(/{lv}/gi, ops.random(1, 100)))
			// 	//else if (cmd.startsWith('<:') && cmd.endsWith('>')) return message.channel.send(new MessageEmbed().setColor('BLUE').setImage(`https://cdn.discordapp.com/emojis/${cmd.split('<:')[1].split('>')[0].split(':')[1]}.png` || `https://cdn.discordapp.com/emojis/${cmd.split('<:')[1].split('>')[0].split(':')[1]}.gif`))
			// 	//require("node-fetch")(`https://builder.pingpong.us/api/builder/5e7c9eeae4b03219076c4844/integration/v0.2/custom/${message.author.id}`, {method: "POST", headers: {"Authorization": `Basic a2V5OmIyYjRkMTYwYTk4NmI3MzEwMTE5NGEyMDI1NjkyMjcz`, "Content-Type": "application/json"}, body: JSON.stringify({request: {query: cmd}})}).then(r => r.json()).then(({ response: { replies: [{ text }] } }) => message.channel.send(text))
			// 	else return message.channel.send("우어어.. 그런 명령어 없다...")
			// 	//존비야 eval message.guild.channels.cache.random().name
			// });
		}
		//console.log(`명령어 사용!\n메시지: ${message.content}\n유저: ${message.author.tag}\n보낸 곳: ${message.channel.type == 'dm' ? `DM` : `"${message.guild.name}" 서버`}`)
	} catch(e) {
		message.channel.send(`으어어.. 에러:\n${e.message || e}`)
		client.users.cache.get(ops.ownerID).send(new MessageEmbed().setColor("RED").setTitle("에러...").setDescription(`${message.author.tag}\n${message.content}\n${e.message || e}\n서버: ${message.channel.type == 'dm' ? 'DM' : message.guild.name}`))
	}
}
//client.db('joins').update({id: message.author.id, joinedAt: Date.now()}).where('id', message.author.id)
//client.db('joins').delete().where('id', message.author.id)
//client.db('joins').insert({id: message.author.id, joinedAt: Date.now()})
//client.db('joins').where('id', message.author.id)
let muyion = ['같은 것을 좋아하고 싫어하는 것이 바로 진정한 우정이다.\n-살루스트', '인생에서 가장 슬픈 세 가지.\n할 수 있었는데,\n해야 했는데,\n해야만 했는데,\n- 루이스 E. 분', '40분 동안 문제를 풀고 나믄 시간은 친구들에게 어떻게 설명해줄까 고민했다.\n- 2009학년도 수능만점자 박창희 군.', '겉모습이란 속임수이다. -플라톤', '너 자신을 알라. -소크라테스', '말은 행동의 거울이다. -솔론', '다퉈도, 화가 나도, 함께 있는 게 좋으니깐... -신영만(짱구 아빠)', '의심으로 가득 찬 마음은 승리로의 여정에 집중할 수 없다. -아서 골든', '꿈은 도망가지 않아. 도망가는 것은 언제나 나 자신이야. -신영만(짱구 아빠)', '약한 자일수록 상대를 용서하지 못한다.\n용서한다는 것은 강하다는 증거다. -신영만(짱구 아빠)', '대신 일할 사람은 있어도 대신할 아빠는 없다. -신영만(짱구 아빠)', '사는 게 힘들다면, 하늘을 보고 소리쳐라. - 존비봇 개발자', '지금처럼 사는 게 더 좋을꺼야. -존비']