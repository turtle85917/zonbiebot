module.exports = {
    name: '골라',
    aliases: [],
    category: '게임',
    run: async (client, message, args) => {
        let choice = []
        for(let  i = 0;i < 20;i++) {
            if (args[i]) {
                if (args[i].length > 10) {
                    choice.push(args[i].slice(0, 10))
                    continue
                }
                choice.push(args[i])
            }
        }

        if (choice.length <= 1 || choice.length >= 11) return message.channel.send('내가 고를 수 있는 단어의 개수는 10개 정도다!..')
        if(choice.includes('@everyone') || choice.includes('@here')) return message.channel.send('죄송하지만 `everyone`이나 `here`이 있으면 저는 못 골라요..')
        message.channel.send(`우어.. 나는 ${choice.length}개의 선택지 중에서 ${choice[Math.floor(Math.random() * choice.length)]}(을)를.. 골랐..다
(참고: 단어가 10글자 초과할 시 단어가 잘릴 수 있음.)`)
    }
}