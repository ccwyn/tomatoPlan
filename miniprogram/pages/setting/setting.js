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
        return{
            imageUrl:'../../image/timg.jpg',
            title: "Tomato番茄闹钟",
            path: "/pages/logs/logs"
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