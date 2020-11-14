const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "오늘운세",
    aliases: ["FortuneOfToday"],
    category: "기본명령어",
    run: async (client, message, args) => {
        let embed = new MessageEmbed().setAuthor(`${message.author.username}님의.. 운세..`, message.author.displayAvatarURL()).setColor("GREEN").addField("총운", ill[Math.floor(Math.random() * ill.length)]).addField("연애운", ill[Math.floor(Math.random() * ill.length)]).addField("금전운", ill[Math.floor(Math.random() * ill.length)]).addField("직장운", ill[Math.floor(Math.random() * ill.length)]).addField("학업, 성적운", ill[Math.floor(Math.random() * ill.length)])
        .setFooter("랜..덤이다.. 우어...").setTimestamp()
        message.channel.send(embed);
    }
}

const ill = ["매우 좋습니다!😁", "좋습니다😀", "보통입니다😙", "나쁩니다😭", "매우 나쁩니다😨", "심각합니다😡", "매우 심각합니다🤬"];