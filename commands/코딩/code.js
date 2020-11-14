module.exports = {
    name: "status_code",
    aliases: ["페이지상태코드", "상태코드"],
    category: "코딩",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("뒤에다가 상대ㅋ..코드를 입력해라..");

        message.channel.send(require("http").STATUS_CODES[args[0]] || "우어.. 그런 코드는 어..없다..")
    }
}