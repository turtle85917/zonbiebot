module.exports = (queue) => {
    const embeds = [];
    let k = 10;
    for (let i = 0;i<queue.length;i+=10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(track => `${++j} [${track.title}](${track.uri})`).join('\n');
        const embed = new(require('discord.js')).MessageEmbed().setDescription(`**[현재 재생 중인 곡: ${queue[0].title}](${queue[0].uri})**\n${info}`)
        embeds.push(embed)
    }
    return embeds;
}