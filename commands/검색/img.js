const fetch = require('node-fetch');

module.exports = {
    name: '멀티태그',
    aliases: [],
    category: '검색',
    run: async (client, message, args) => {
        if (!message.attachments.map(x => x.attachment)[0]) return message.channel.send("우어.. 파일을 올려라..");

        let { result: { label_kr } } = await fetch(`https://kapi.kakao.com/v1/vision/multitag/generate?image_url=${message.attachments.map(x => x.attachment)[0]}`, {method: "POST", headers: {"Authorization": `KakaoAK dc882c632eae47df69726c5b1a87aa4f`}}).then(e => e.json())

        if (!label_kr[0]) return message.channel.send("우어.. 그 이미지에서는 태그가 생성이 안ㄷ ㅚ..된다..");

        message.channel.send(new(require('discord.js')).MessageEmbed().setColor('PURPLE').setDescription(`\`#${label_kr.join('\`, \`#')}\``))
    }
}