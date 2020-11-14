module.exports = {
    name: "지식",
    aliases: ["창고"],
    category: "유용한 기능",
    async run(client, message, args) {
        try {
            switch (args[0]) {
                case "전체":
                    require("../../src/tools/alllist")(client, message);
                    break;
                case "나":
                    require("../../src/tools/mylist")(client, message);
                    break;
                default:
                    let m = await message.channel.send(new(require("discord.js")).MessageEmbed().setDescription(`옵션을 선택해주세요.\n\n:bust_in_silhouette: 내가 가르친 지식을 볼 수 있어요.\n- 다른 사림애 내가 가르친 것을 몇 번 사용했는지 알 수 있어요.\n- \`존비야 지식 나\`로 해당 옵션을 사용할 수 있어요.\n\n👥 모든 사람에 지식을 볼 수 있어요.\n- 태그는 #12** 형식으로 전체는 보여주지 않아요.\n- \`존비야 지식 전체\`로 해당 옵션을 사용할 수 있어요.`).setColor("GREEN"));
                    await m.react("764124734957944846");
                    await m.react("👥");
                    await m.react("❌");
                    m.awaitReactions((reaction, user) => (reaction.emoji.id === `764124734957944846` || reaction.emoji.name === "👥" || reaction.emoji.name === "❌") && user.id === message.author.id, { max: 1, time: 60000 }).then(async collected => {
                        const choose = collected.array()[0].emoji;
                        if (choose.id === "764124734957944846") {
                            try {
                                m.delete();
                            } catch {return;}
                            require("../../src/tools/mylist")(client, message);
                        } else if (choose.name === "👥") {
                            try {
                                m.delete();
                            } catch {return;}
                            require("../../src/tools/alllist")(client, message);
                        } else if (choose.name === "❌") {
                            try {
                                m.delete();
                            } catch {return;}
                            message.channel.send("취소됬습니다.")
                        }
                    }).catch(() => {message.channel.send("시간 초과")})
            }
        } catch (e) {
            message.channel.send(e.message || e);
        }
    }
}