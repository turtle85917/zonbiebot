module.exports = {
    name: "잊어",
    aliases: ["지식제거", "까먹어"],
    category: "유용한 기능",
    async run (client, message, args) {
        if (!args[0]) return message.channel.send("삭제할 어휘를 적어주세요.");
        //if (args[0].includes("@everyone") || args.slice(1).join(" ").includes("@everyone") || args[0].includes("@here") || args.slice(1).join(" ").includes("@here")) return message.channel.send("everyone, here와 같은 멘션은 제외해주세요.");
        if (!(await client.db('book').where({ title: args[0] }))[0]) return message.channel.send("아직 배운 내용이 아니에요.");
        await client.db("book").delete().where({ title: args[0] });
        message.channel.send("제 기억 속에서 그 단어는 사라졌어요..");
    }
}