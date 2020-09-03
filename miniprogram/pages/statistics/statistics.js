getApp();

Page({
    data: {
        records: [],
        searchPageNum: 0,
        searchLoadingComplete: !1,
        total: 0,
        modalHidden: !0,
        toastHidden: !0
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "Scrum番茄闹钟",
            path: "/pages/statistics/statistics",
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "转发失败，再次转发",
                    icon: "success",
                    duration: 2e3
                });
            },
            complete: function(t) {
                console.log("用户转发了");
            }
        };
    },
    onShow: function() {
        var t = this;
        wx.cloud.callFunction({
            name: "tomatototal"
        }).then(function(o) {
            var a = o.result;
            t.setData({
                total: a.total
            }), a.total > 0 && t.getData();
        }).catch(function(t) {
            console.log(t);
        });
    },
    onLoad: function() {},
    onReachBottom: function() {
        var t = this.data.skipNum;
        20 * ++t < this.data.total && this.getData(t);
    },
    getData: function(t) {
        var o = this, a = wx.cloud.database().collection("tomato");
        t && (a = a.skip(20 * t)), a.limit(20).orderBy("startTime", "desc").get().then(function(a) {
            var e = o.data.records;
            e = e.concat(a.data), o.setData({
                records: e,
                skipNum: t || 0
            });
        }).catch(function(t) {
            console.error(t);
        });
    },
    coverDate: function(t) {
        return new Date(t).toLocaleDateString();
    },
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
        wx.setStorageSync("tomatos", []), this.switchModal(), this.setData({
            toastHidden: !1
        }), this.getTomatos();
    }
});