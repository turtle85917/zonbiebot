module.exports = {
    name: '직업',
    aliases: ['직업정보'],
    category: '기본명령어',
    run: async (client, message, args) => {
        if (!args.join(' '))return message.channel.send('우어.. 뒤에다가 직업 이름을 적어라..')
        require('node-fetch')(`https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=face9010815f5c41e35423c3659cc181&svcType=api&svcCode=JOB&contentType=json&gubun=job_dic_list&searchJobNm=${encodeURI(args.join(' '))}`).then(e => e.json()).then(e => e.dataSearch).then(e => e.content).then(e => {
            if (!e[0]) return message.channel.send(`\`${args.join(' ')}\`(에)대한 검색결과가 없다..`)
            if (e.length == 0) return message.channel.send(new(require('discord.js')).MessageEmbed().setColor('BLUE').setDescription(`**직업 분야**\n${e[0].profession || '없음'}\n\n**직업 설명**\n${e[0].summary || '없음'}\n\n**유사 직업**\n${e[0].similarJob == null ? '없음' : e[0].similarJob}\n\n**연봉**/**발전 가능성**/**일자리 전망**\n${e[0].salery || '없음'}/${e[0].possibility || '없음'}/${e[0].prospect || '없음'}`).setTitle(`\`${e[0].job}\` 직업 정보`))
            message.channel.send(`${e.length}개의 검색결과가 있습니다. 원하는 번호를 입력하세요.(제한 시간: 10초)
${e.map((x, i) => `${i + 1}. ${x.job}`).join('\n')}`)
            message.channel.awaitMessages(msg => msg.author.id === message.author.id && (msg.content > 0 && msg.content < e.length + 1), {max: 1, time: 10000, errors: ["time"]}).then(collected => {
                const JobIndex = parseInt(collected.first().content);
                message.channel.send(new(require('discord.js')).MessageEmbed().setColor('BLUE').setDescription(`**직업 분야**\n${e[JobIndex - 1].profession || '없음'}\n\n**직업 설초**\n${e[JobIndex - 1].summary || '없음'}\n\n**유사 직업**\n${e[JobIndex - 1].similarJob || '없음'}\n\n**연봉**/**발전 가능성**/**일자리 전망**\n${e[JobIndex - 1].salery || '없음'}/${e[JobIndex - 1].possibility || '없음'}/${e[JobIndex - 1].prospect || '없음'}`).setFooter(`${args.join(' ')}에 대한 결과 ${e.length}건 중 ${JobIndex}건`).setTitle(`\`${e[JobIndex - 1].job}\` 직업 정보`))
            }).catch(collected => message.channel.send('우어.. 시간이 지났다..'))
        })
    }
}