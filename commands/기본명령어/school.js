module.exports = {
    name: '학교',
    aliases: ['학교정보'],
    category: '기본명령어',
    run: async (client, message, args) => {
        if(!args.join(' ')) return message.channel.send('우어.. 뒤에다가 학ㄱ..교이름..을.. 저거..적어라..')
        let school_type = ''
        if (args.join(' ').endsWith('초') || args.join(' ').endsWith('초등') || args.join(' ').endsWith('초등학교')) {
            school_type = 'elem_list'
        } else  if (args.join(' ').endsWith('중') || args.join(' ').endsWith('중학교')){
            school_type = 'midd_list'
        } else  if (args.join(' ').endsWith('고') || args.join(' ').endsWith('고등') || args.join(' ').endsWith('고등학교')){
            school_type = 'high_list'
        } else  if (args.join(' ').endsWith('대') || args.join(' ').endsWith('대학교')){
            school_type = 'univ_list'
        } else  if (args.join(' ').endsWith('대안') || args.join(' ').endsWith('대안학교')){
            school_type = 'alte_list'
        } else  if (args.join(' ').endsWith('특수') || args.join(' ').endsWith('특수학교')){
            school_type = 'seet_list'
        } else return message.channel.send('우어.. 학교 이름이 만약 초등학교면 뒤에다가 초등학교를 입력해야 된다..')

        require('node-fetch')(`https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=face9010815f5c41e35423c3659cc181&svcType=api&svcCode=SCHOOL&contentType=json&gubun=${school_type}&searchSchulNm=${encodeURI(args.join(' '))}`).then(e => e.json()).then(e => {
            let src = e.dataSearch.content
            if (!src[0]) return message.channel.send('학교를 찾을 수 없다..')
            message.channel.send(new(require('discord.js')).MessageEmbed().setColor('BLUE').setDescription(`${src.map((x, i) => `${i + 1}. [${x.schoolName}](${x.link}) - ${x.region}`).join('\n')}`))
        })
    }
}