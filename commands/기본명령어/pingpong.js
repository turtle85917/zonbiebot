module.exports = {
    name: '핑퐁빌더',
    aliases: ['핑퐁'],
    category: '기본명령어',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send("아무것도 없네요");
        require("node-fetch")(`https://builder.pingpong.us/api/builder/5e7c9eeae4b03219076c4844/integration/v0.2/custom/${message.author.id}`, {method: "POST", headers: {"Authorization": `Basic a2V5OmIyYjRkMTYwYTk4NmI3MzEwMTE5NGEyMDI1NjkyMjcz`, "Content-Type": "application/json"}, body: JSON.stringify({request: {query: args.join(' ')}})}).then(r => r.json()).then(({ response: { replies: [{ text }] } }) => message.channel.send(text))
    }
}