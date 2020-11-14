module.exports = async (client, oldMember, newMember) => {
    try {
        const player = client.music.players.get(oldMember.guild.id);
        if (!player) return;
        if (!newMember.guild.members.cache.get(client.user.id).voice.channelID) client.music.players.destroy(player.guild.id);
        if (oldMember.id === client.user.id) return;
        if (!oldMember.guild.members.cache.get(client.user.id).voice.channelID) return;
        if (oldMember.guild.members.cache.get(client.user.id).voice.channel.id === oldMember.channelID) {
            if (oldMember.guild.voice.channel && oldMember.guild.voice.channel.members.size === 1) {
                const vcName = oldMember.guild.me.voice.channel.name;
                const msg = await player.textChannel.send(`남아있는 유저가 없어 \`${60000 / 1000}\`초 후 음성채널 연결 해제할게요.`);
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(60000);

                const vcMembers = oldMember.guild.voice.channel.members.size;
                if (!vcMembers || vcMembers === 1) {
                    const newPlayer = client.music.players.get(newMember.guild.id);
                    if (newPlayer) client.music.players.destroy(newPlayer.guild.id);
                    else oldMember.guild.voice.channel.leave();
                    return player.textChannel.send(`\`${vcName}\`에서 연결 해제 했어요!`).then(m => m.delete({ timeout: 5000 })).catch(()=>{return});
                } else {
                    try {msg.delete()} catch {return;}
                }
            }
        }
    } catch {return;}
}