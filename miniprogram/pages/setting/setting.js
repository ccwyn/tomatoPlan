getApp();

Page({
    data: {
        workTime: 20,
        restTime: 5,
        recordId: null,
        themeIndex: 0,
        extraData: {
            id: 29822,
            customData: {}
        }
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "Scrum番茄闹钟",
            path: "/pages/setting/setting",
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
    onLoad: function(t) {
        this.getSettingData();
    },
    onShow: function() {},
    onHide: function() {},
    getSettingData: function() {
        var t = this;
        wx.cloud.database().collection("setting").get({
            success: function(e) {
                1 == e.data.length ? t.setData({
                    workTime: e.data[0].taskMinutes,
                    restTime: e.data[0].restMinutes,
                    recordId: e.data[0]._id
                }) : t.setData({
                    workTime: 20,
                    restTime: 5,
                    recordId: null
                });
            }
        });
    },
    changeWorkTime: function(t) {
        this.setData({
            workTime: t.detail.value
        }), wx.setStorage({
            key: "workTime",
            data: t.detail.value
        });
    },
    changeRestTime: function(t) {
        this.setData({
            restTime: t.detail.value
        }), wx.setStorage({
            key: "restTime",
            data: t.detail.value
        });
    },
    saveSetting: function(t) {
        var e = this, a = e.data.workTime, o = e.data.restTime, s = e.data.recordId, i = wx.cloud.database();
        s ? i.collection("setting").doc(s).update({
            data: {
                taskMinutes: parseFloat(a),
                restMinutes: parseFloat(o)
            }
        }).then(function(t) {
            console.log(t), wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2e3
            });
        }) : i.collection("setting").add({
            data: {
                taskMinutes: parseFloat(a),
                restMinutes: parseFloat(o)
            }
        }).then(function(t) {
            console.log(t), wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2e3
            });
        });
    }
});