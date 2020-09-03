function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(t, e) {
        var n = "0000000000" + t, r = e.length;
        return n.substr(-r);
    },
    formatDate: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), a = e.getMinutes(), i = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, a, i ].map(t).join(":");
    }
};