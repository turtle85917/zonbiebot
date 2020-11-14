const { Collection, MessageCollector, MessageEmbed } = require('discord.js'), hangul = require('hangul-js');
let langData = ['IllllIlllIlllIIllllllIIIIllllIIIll', '너 자신을 알라.', '나는 생각한다. 고로 나는 존재한다.', "안촉촉한 초코칩 나라에 살던 안촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데 촉촉한 초코칩 나라의 촉촉한 초코칩 문지기가 \"넌 촉촉한 초코칩이 아니고 안촉촉한 초코칩이니까 안촉촉한 초코칩나라에서 살아\"라고해서 안촉촉한 초코칩은 촉촉한 초코칩이 되는것을 포기하고 안촉촉한 초코칩 나라로 돌아갔다.", "다크는 회색이 아니다. 검정이다.", "일찍 일어나는 새가 벌레를 잡는다.", "내게 오는 모든 것은 다 축복이었다.", "오늘도 나는 행복한 하루를 보냈다.", "내려갈 때 보았네.. 올라갈 때 보지 못한 그 꽃.", '여러분도 하루에 25분만! 태보에 세계로 들어가봅시다! (와!!)', '꿀꿀꿀꿀꿀꿀꼴꿀꿀꿀', '삼겹살은 돼지고기입니다!', '룰루랄라~~ 우리 모두 신나게 외쳐봅시다!', '피청구인 대통령 닭ㄹ혜를 파면한다.', '세상 사람들은 항상 다 그렇다.', '배고픈 사람이 배부른 사람을 찾아가서 밥 달라고 했는데, 배부른 사람이 밥 한공기를 주었는데, 배고픈 사람이 더 달라고 하자, 배부른 사람이 밥 주걱으로 배고픈 사람을 때렸다.', '나는 바보다! 나는 바보다! 나는 바보다! 나는 바보다!', 'I know you. You know me.', 'Fun, Cool, Sexy', 'Wa! You know sans!', 'Whose sock is this?', 'How much are the shoes?', 'I want to be a movie director.', 'My favorite subject is English.', 'I love you!', 'Zonbie is cool!(Puck!', 'ABCDEFGHIJKLNMOPQRSTUVWXYZ', '난 정말 귀엽고, 사랑스럽고, 끔찍해!']
module.exports = {
    name: '타자게임',
    aliases: ['타자'],
    category: '게임',
    guildOnly: true,
    run: async (client, message, args) => {
        let start = new Collection()
        if(start.has(message.channel.id)) return message.channel.send('우어.. 이 채널에서는 누군가가 하고 있..다')
        start.set(message.channel.id, {})
        let w = langData[Math.floor(Math.random() * langData.length)]
        const world = w.split('').join('\u200b')
        message.channel.send(new MessageEmbed().setColor('RED').setDescription(`다음 언어를 **1분** 안에 정확하게 입력하세요.\n\n${world}`).setFooter('출처: https://github.com/flashbot-discord/flashbot'))
        const start_time = Date.now()
        const collector = message.channel.createMessageCollector((m) => m.author.id == message.author.id, { time: 60000 })

        collector.on('collect', m => {
            if (m.content == world) return message.channel.send('❌ 복사&붙여넣기 금지.')
            if (m.content != w) return;

            const time = (Date.now() - start_time) / 1000
            const ta = Math.round(hangul.d(w).length / time * 60)
            message.channel.send(new MessageEmbed().setColor('GREEN').setDescription(`시간: ${time}초 / 타수: ${ta}타`))
            collector.stop('collect')
        })
        
        collector.on('end', (_, reason) => {
            if (reason != 'collect') return message.channel.send('우어.. 아무도 입력하지 않아 타자 종료..')

            start.delete(message.channel.id)
            //if (reason != 'correct')
        })
    }
}