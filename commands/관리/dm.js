module.exports = {
    name: 'dm공지',
    aliases: ['디엠공지'],
    guildOnly: true,
    category: '관리',
    run: async (client, message, args) => {
        if (message.author.id != message.guild.owner.id) return message.reply(':no_entry: 서버 주인만 가능');
        if (!args.join(' ')) return message.channel.send('`존비야 dm공지 <내용>`')

        const members = message.guild.members.cache.filter(x => !x.user.bot);

        if (members.size > 0) return message.reply('DM 공지 기능은 봇 제외 인원이 0명 이하인 서버만 지원');
        
        const failedMembers = [];

        for (const m of members) {
            await m[1].user.send(`**${message.guild.name} 서버 공지**\n\n${args.join(' ')}`).catch(async (err) => failedMembers.push(m[1]))
        }

        if (failedMembers.length) message.reply(`${failedMembers.length}명의 유저에게 공지를 보내는 데 실패했습니다:\n\`\`\`${failedMembers.map(m => `${m.user.tag} ${m.nickname ? `(${m.nickname})` : ''}`).join('\n')}\`\`\``);
        else message.channel.send('모든 멤버에게 성공적으로 공지를 전송하였습니다.');
    }
}