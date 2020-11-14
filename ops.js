const table = (new(require("ascii-table"))).setHeading("Command", "Status"),
    { readdirSync, fstat } = require("fs"),
    { MyBot } = require("koreanbots"),
    fs = require('fs');

/**
 * @param {number} num 쌓을 피라미드 층의 수.
 * 
 * @return {string}
*/

module.exports = {
    ownerID: "ownerID",
    prefix: "존비야",
    MyBot: new MyBot("KoreanBotToken"),
    formatTime: time => {
        const date = new Date(time);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`
    },
    time: ti => {
        const d = new Date(ti);
        return d.getDate()
    },
    getMember: (msg, mem) => {
        let member = msg.guild.members.cache.get(mem);

        if (!member && msg.mentions.members) member = msg.mentions.members.first();
        if (!member && mem) member = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(mem) || m.user.username.toLowerCase().includes(mem) || m.user.tag.toLowerCase().includes(mem));
        if (!member) member = msg.member;

        return member
    },
    getChannel: (msg, ch) => {
        let channel = msg.guild.channels.cache.get(ch);

        if (!channel && msg.mentions.channels) channel = msg.mentions.channels.first();
        if (!channel && ch) channel = msg.guild.channels.cache.find(m => m.name.toLowerCase().includes(ch));
        if (!channel) channel = msg.channel;

        return channel
    },
    getRole: (msg, ro) => {
        let role = msg.guild.roles.cache.get(ro);

        if (!role && msg.mentions.roles) role = msg.mentions.roles.first();
        if (!role && ro) role = msg.guild.roles.cache.find(m => m.name.toLowerCase().includes(ro));
        if (!role && !msg.guild.roles.cache.find(m => m.name.toLowerCase().includes(ro))) role = msg.guild.roles.cache.find(m => m.id.toLowerCase() == ro);
        if (!role) role = msg.member.roles.highest;

        return role
    },
    table: (client) => {
        readdirSync("./commands/").forEach(dir => {
            readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js")).forEach(file => {
                let pull = require(`./commands/${dir}/${file}`);
        
                if (pull.name) {
                    client.commands.set(pull.name, pull)
                    table.addRow(file, "✅")
                } else table.addRow(file, "❌")
        
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name))
            })
        });
    
        return table.toString()
    },
    emoji: (emoji) => {
        return require("./src/tools/emoiji")[emoji]
    },
    hype: function (client, flag) {
        if (flag == 'HOUSE_BRILLIANCE') {
            return `House of Brilliance`;
        } else if (flag == 'HOUSE_BRAVERY') {
            return `House of Bravery`;
        } else if (flag == 'HOUSE_BALANCE') {
            return `House of Balance`;
        }
    },
    random: (max, min) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getWorldTime: (tzOffset) => {
        function leadingZeros (n, digits) {
            var zero = '';
            n = n.toString();
           
            if (n.length < digits) {
              for (let i = 0; i < digits - n.length; i++)
                zero += '0';
            }
            return zero + n;
        }
        var now = new Date();
        var tz = now.getTime() + (now.getTimezoneOffset() * 60000) + (tzOffset * 3600000);
        now.setTime(tz);
       
       
        var s =
          leadingZeros(now.getFullYear(), 4) + '년 ' +
          leadingZeros(now.getMonth() + 1, 2) + '월 ' +
          leadingZeros(now.getDate(), 2) + '일 ' +
       
          leadingZeros(now.getHours(), 2) + '시 ' +
          leadingZeros(now.getMinutes(), 2) + '분 ' +
          leadingZeros(now.getSeconds(), 2) + '초';
       
        return s;
    },
    readline: (n) => {
        function prime(x) {
            let primeNumbers = [], divisor = 0, squareRoot = 0, mok = 0, nmg = 0;

            do {
                divisor = 2
                squareRoot = parseInt(Math.sqrt(x))
                do {
                    if (divisor > squareRoot) {divisor = x; break;}
                    mok = parseInt(x/divisor);
                    nmg = x - mok * divisor;
                } while (nmg != 0 && divisor++)
                primeNumbers.push(divisor)
            } while (x != divisor && (x = mok))

            return primeNumbers
        }

        return prime(n)
    },
    getRandomArbitrary: (min, max) => {
        return Math.random() * (max - min) + min;
    },
    per: (num, w) => {
        let engilsh = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let _num = num,
		__num = 1;

	    let text = ``;

	    let space = `    `, world = `${Number(w) ? w : `\\${w}` }`;

        if (engilsh.includes(w)) world = w;
	    for(; num > 0; num--){
		    text += (num === _num ? `` : `\n`) + space.repeat(num - 1) + world.repeat(__num);
		    __num += 2;
	    }

        text = text.replace(` `, `** **`);
        
        return text
    },
    getOs: client => {
        return {win32: `${client.emojis.cache.find(x => x.name == "windows")} Windows ${{x64: '64비트', x32: '32비트'}[process.arch]}`, linux: `${client.emojis.cache.find(x => x.name == "linux")} Linux`, darwin: `${client.emojis.cache.find(x => x.name == "mac")} Mac`}[process.platform] || process.platform
    },
    getUptime: client => {
        return `${Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString().padStart(1, '0')}일 ${Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString().padStart(2, '0')}시간 ${Math.floor((client.uptime / (1000 * 60)) % 60).toString().padStart(2, '0')}분 ${Math.floor((client.uptime / 1000) % 60).toString().padStart(1, '0')}초`
    },
    bar: (value, maxValue, size) => {
        const percentage = value / maxValue, progress = Math.round((size * percentage)), empty = size - progress, progressText = '🔘'.repeat(progress), emptyProgressText = '-'.repeat(empty), percentageText = Math.round(percentage * 100) + '%';

        return '[' + `[${progressText}](https://zonbie.com)` + emptyProgressText + '] ' + percentageText;
    }
}
