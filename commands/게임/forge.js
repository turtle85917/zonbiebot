module.exports = {
    name: '강화',
    aliases: [],
    category: '게임',
    run: async (client, message, args, ops, user, add, aser, cc, money, vote) => {
        let embed = new(require('discord.js')).MessageEmbed().setColor('RANDOM').setDescription('시작하려면 \\✅를 누르시고, 취소하려면 \\⛔에 누르십시오.')
        let msg = await message.channel.send(embed)
        await msg.react('✅');
        await msg.react('⛔');
        let filter = (reaction, user_) => {return ['✅', '⛔'].includes(reaction.emoji.name) && user_.id === message.author.id;}

        const collected = await msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['times'] }).catch(collection => {return message.channel.send('우어.. 시간이 지났다..')});

        const userReaction = collected.first();

        if (!userReaction) return message.channel.send('우어.. 시간이 지났다..')

        if (userReaction.emoji.name == '⛔') return message.channel.send('강화 게임 취소..')
           
        let result = false, count = 0, per = 100, all = 100;

        while (!result) {
            embed.setDescription(`${count ? '강화에 성공했습니다!' : ''}
**🛠️ 강화 횟수:** ${count}회
**📶 성공 확률:** ${per.toFixed(1)}%

강화하려면 \\✅를 누르시고, 취소하려면 \\⛔에 누르십시오.`)
.setTimestamp()
            msg.edit(embed);

            const gameCollected = await msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] }).catch(collection => { result = 'timeover'; });
            if (result !== 'timeover') {
                const gameReaction  = gameCollected.first();

                const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.user.remove(message.author.id)
                    }
                } catch (error) {/*console.error('Failed to remove reactions.')*/}

                if (gameReaction.emoji.name === '⛔') result = 'finish';
                else {
                    const random = ops.getRandomArbitrary(0, 100);

                    if (random < per) {
                        count++;
                        const percent = ops.getRandomArbitrary(0.95, 0.98);
                        per *= percent
                        all *= percent / 100;
                    }
                    else result = 'fail';
                }
            }
        }
        msg.reactions.removeAll().catch(err => console.error(`이모지 삭제 실패..`));

        if (result == 'finish') {
            embed.setColor('GREEN')
            .setDescription(`
강화를 성공적으로 마쳤습니다!

**🛠️ 강화 횟수:** ${count}회
**📶 성공 확률:** ${per.toFixed(2)}%`)
            .setTimestamp()
            msg.edit(embed)
        } else if (result == 'fail') {
            embed.setColor('RED')
            .setDescription(`
강화에 실패했습니다...

**🛠️ 강화 횟수:** ${count}회
**📶 성공 확률:** ${per.toFixed(2)}%`)
            .setTimestamp()
            msg.edit(embed)
        } else {
            embed.setColor('RED')
            .setDescription(`
시간이 초과되었습니다!

**🛠️ 강화 횟수:** ${count}회
**📶 성공 확률:** ${per.toFixed(2)}%`)
            .setTimestamp()
            msg.edit(embed)
        }
    }
}