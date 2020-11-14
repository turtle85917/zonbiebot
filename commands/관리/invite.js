const arraySort = require('array-sort'),
    table = require('table');

module.exports = {
    name: '초대코드조회',
    aliases: [],
    run: async (client, message, args) => {
        try {
            let invites = await message.guild.fetchInvites();
            invites = invites.array();
            arraySort(invites, 'uses', { reverse: true });
            let possibleInvites = [['유저', '사용 횟수']];
            invites.forEach(invite => {
                possibleInvites.push([invite.inviter.username, invite.uses]);
            })
    
            message.channel.send(new(require('discord.js')).MessageEmbed().setColor(0x7289da).setDescription(`\`\`\`${table.table(possibleInvites)}\`\`\``))   
        } catch (e) {
            message.channel.send(`에러\n${e.message || e}`)
        }
    }
}