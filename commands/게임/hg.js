module.exports = {
    name: "행맨",
    aliases: [],
    category: "게임",
    guildOnly: true,
    async run (_, message, __) {
        new(require("../../src/tools/hangman-game"))(message).newGame(message);
    }
}