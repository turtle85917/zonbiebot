const { MessageEmbed } = require("discord.js"),
    translate = require('@vitalets/google-translate-api'),
    fetch = require("node-fetch"),
    langToName = {ko: "한국어", ja: "일본어", "zh-cn": "중국어 간체", "zh-tw": "중국어 번체", hi: "힌디어", en: "영어", es: "스페인어", fr: "프랑스어", de: "독일어", pt: "포르투갈어", vi: "베트남어", id: "인도네시아어", fa: "페르시아어", ar: "아랍어", mm: "미얀마어", th: "태국어", ru: "러시아어", it: "이탈리아어", unk: "알 수 없음"},
    l = {한국어: 'kr', 영어: 'en', 일본어: 'jp', 중국어: 'cn', 베트남어: 'vi', 인도네시아어: 'id', 아랍어: 'ar', 뱅갈어: 'bn', 독일어: 'de', 스페인어: 'es', 프랑스어: 'fr', 힌디어: 'hi', 이탈리아어: 'it', 말레이시아어: 'ms', 네달란드어: 'nl', 포르투갈어: 'pt', 러시아어: 'ru', 태국어: 'th', 터키어: 'tr'};
    
module.exports = {
    name: "번역",
    aliases: [],
    category: "재미",
    run: async (client, message, args) => {
        let reusl = undefined
        if (!args[0]) return message.channel.send("우어.. 시작 언어를 입력해달라...");
        if (!args[1]) return message.channel.send("우어.. 번역 언어를 입력해달라...");
        if (args[0] == "자동") {
            if (!require('../../src/json/translate.json')[args[1]]) return message.channel.send("우어.. 구글 번역기 또는 파파고에서 지원하지 않는 언어다..");
            const { langCode } = await fetch("https://openapi.naver.com/v1/papago/detectLangs", {method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Naver-Client-Id": "Zf95N7IPgvO8Sj_FM4hv", "X-Naver-Client-Secret": "9AMXsj3CQo"},body: `query=${args.join(" ")}`}).then(e => e.json())
            let w = await fetch(`https://dapi.kakao.com/v2/translation/language/detect?query=${encodeURI(args.slice(2).join(' '))}`, {method: 'POST', headers: {"Authorization": "KakaoAK dc882c632eae47df69726c5b1a87aa4f"}}).then(r => r.json())

            return translate(args.slice(2).join(" "), { to: require('../../src/json/translate.json')[args[1]] }).then(r => message.channel.send(new MessageEmbed().setTitle('통합 (자동) 번역').setColor(0x00ff00).setDescription(`**번역 전**\n\`\`\`fix\n${args.slice(2).join(" ")}\n\`\`\`\n**구글 번역기**\n\`\`\`yml\n${r.text}\n\`\`\`\n**파파고 (언어 인식)**\n\`\`\`yml\n${langToName[langCode]}\n\`\`\`\n**카카오 (언어 인식)**\n\`\`\`yml\n${langToName[w.language_info.code] || w.language_info.code}\n\`\`\``))).catch(e => message.channel.send(`에러..:\n${e}`))
        }
        if (!args.slice(2).join(" ")) return message.channel.send("우어.. 번역 메시지를 입력해달라...");
        if (!require('../../src/json/translate.json')[args[0]] || !require('../../src/json/translate.json')[args[1]]) return message.channel.send("우어.. 구글 번역기 또는 파파고, 카카오 번역기에서 지원하지 않는 언어다..")
        const res = await fetch("https://openapi.naver.com/v1/papago/n2mt", {method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Naver-Client-Id": "Zf95N7IPgvO8Sj_FM4hv", "X-Naver-Client-Secret": "9AMXsj3CQo"}, body: `source=${require('../../src/json/translate.json')[args[0]]}&target=${require('../../src/json/translate.json')[args[1]]}&text=${args.slice(2).join(" ")}`}).then(e => e.json())
        try {var res_ = await fetch(`https://dapi.kakao.com/v2/translation/translate?query=${encodeURI(args.slice(2).join(' '))}&src_lang=${l[args[0]] || args[0]}&target_lang=${l[args[1]] || args[1]}`, {method: 'POST', headers: {"Authorization": "KakaoAK dc882c632eae47df69726c5b1a87aa4f"}}).then(r => r.json());} catch(e) {reusl = 'Language not supported by Kakao (지원하지 않는 언어입니다.)'}
        translate(args.slice(2).join(" "), { from: require('../../src/json/translate.json')[args[0]], to: require('../../src/json/translate.json')[args[1]] }).then(r => message.channel.send(new MessageEmbed().setTitle('통합 번역').setColor(0x00ff00).setDescription(`**번역 전**\n\`\`\`fix\n${args.slice(2).join(" ")}\n\`\`\`\n${client.emojis.cache.get("728854831191687178")} **구글 번역기**\n\`\`\`yml\n${r.text}\n\`\`\`\n${client.emojis.cache.get("728854987114938379")} **파파고** ${res.errorMessage ? '(❌ 에러)' : ''}\n\`\`\`yml\n${res.errorMessage ? res.errorMessage : res.message.result.translatedText}\n\`\`\`\n${client.emojis.cache.get("734263311180234813")} **카카오** ${res_ ? '' : '(❌ 에러)'}\n\`\`\`yml\n${res_ ? res_.translated_text : reusl}\n\`\`\``))).catch(e => message.channel.send(`에러..:\n${e}`))
    }
}