module.exports = {
    name: '슬로우모드',
    aliases: [],
    category: '관리',
    guildOnly: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`${!message.channel.rateLimitPerUser ? `으어.. 이 채널은 현재 슬로우모드가 안 걸려있다..` : `으어.. 이 채널은 현재 ${message.channel.rateLimitPerUser}초에 슬로우 모드가 걸려있다..`}`)
        if (isNaN(args[0]) || args[0] < 0 || args[0] > 21600 || args[0].includes(".")) return message.channel.send('0 ~ 21600초 사이로 입..력해라..')

        message.channel.setRateLimitPerUser(parseInt(args[0])).then(() => message.channel.send(`${args[0] == 0 ? `슬로우모드를.. 해제했..다` : `${args[0]}초로 설정을.. 완료..`}`)).catch(e => message.channel.send(`권한이 부족하거나 에러가..:\n${e}`))
    }
}