require("../../utils/util.js");

Page({
    data: {
        logs: [],
        modalHidden: !0,
        toastHidden: !0
    },
    onShow: function() {
        wx.setNavigationBarTitle({
            title: "任务统计"
        }), this.getLogs();
    },
    set: function() {},
    getLogs: function() {
        try {
            var t = wx.getStorageSync("logs");
            t ? t.forEach(function(t, o, a) {
                t.startTime = new Date(t.startTime).toLocaleString();
            }) : t = [], this.setData({
                logs: t
            });
        } catch (t) {
            console.log(t);
        }
    },
    onLoad: function() {},
    switchModal: function() {
        this.setData({
            modalHidden: !this.data.modalHidden
        });
    },
    hideToast: function() {
        this.setData({
            toastHidden: !0
        });
    },
    clearLog: function(t) {
        wx.setStorageSync("logs", []), this.switchModal(), this.setData({
            toastHidden: !1
        }), this.getLogs();
    }
});