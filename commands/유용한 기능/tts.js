const discordTTS = require("discord-tts");

module.exports = {
    name: "tts",
    aliases: ["TTS"],
    category: "유용한 기능",
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send("우어.. 음성채널에 들어갈 수 있는 권한이 없ㄷ..다..")
        if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send("나는.. 음성채널에.. 말할 수 없다.. 우어")
        if (!message.member.voice.channel) return message.channel.send("음성채널에 먼저 들어가라.. 우어어..")
        if (!args.join(" ")) return message.channel.send("뒤에다가 tts 메시ㅈ..지를 입력해라.. 우어")
        if (args.join(" ").length > 200) return message.channel.send("tts 메시ㅈ..지를 200글자 이내로 적어라.. 우어")
        if (message.guild.me.voice.channelID) return;
        const voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection => {
            message.channel.send("지금 현재 말하는 중이다! 우어어..")
            const stream = discordTTS.getVoiceStream(args.join(" "), "ko-KR");
            const dispatcher = connection.play(stream);
            dispatcher.on("finish",() => voiceChannel.leave())
        });
    }
}