const Myriad = require('../../src/tools/myriad')

function parseMessage(message) {
    const regex = /^\s*(`{1,3})(.+?)[ \n]([^]+)\1\s*$/;
    const match = message.match(regex);
    if (!match) return;

    const language = Myriad.Aliases.get(match[2].toLowerCase());
    if (!language) return;

    const code = match[3].trim();
    return { language, code };
}

module.exports = {
    name: 'complie',
    aliases: ["컴파일"],
    category: '코딩',
    async run(client, message, args) {
        if (message.guild && !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

        const parse = parseMessage(args.join(' '));
        if (!parse) return message.channel.send(`네?`)

        let reaction;
        if (!message.guild || message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
            try {
                await Promise.all(message.reactions.cache.filter(r => r.me).map(r => r.users.remove()));
                reaction = await message.react('📝');
            } catch (e) {
            }
        }

        const [ok, response] = await client.myriad.postEval(parse.language, parse.code);
        if (!message.guild || message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
            try {
                if (reaction) {
                    await reaction.users.remove();
                }

                if (ok) {
                    await message.react('✔');
                } else {
                    await message.react('✖');
                }
            } catch (e) {}
        }

        const output = `\`\`\`\n${response}\n\`\`\``;
        if (output.length >= 2000) {
            const key = await fetch('https://hasteb.in/documents', { method: 'POST', body: response }).then(res => res.json()).then(json => json.key);
            return message.channel.send(`결과가 너무 기네요 : <https://hasteb.in/${key}>`);
        }

        return message.channel.send(output);
    }
}