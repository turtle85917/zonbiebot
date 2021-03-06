const { Utils } = require('erela.js');

module.exports = (duration) => {
    if (isNaN(duration) || typeof duration === "undefined") return "00:00";
    if (duration > 3600000000) return "live stream";
    return Utils.formatTime(duration, true);
}