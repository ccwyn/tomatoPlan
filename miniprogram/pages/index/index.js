var t = require("../../utils/util.js"), e = {
    stop: "停止",
    start: "开始",
    end: "结束",
    cancel: "放弃"
}, a = {
    left: 45,
    right: -45
};

getApp();

Page({
    data: {
        remainTimeText: "",
        timerType: "work",
        log: {},
        completed: !1,
        isRuning: !1,
        leftDeg: a.left,
        rightDeg: a.right,
        taskTypeList: [],
        workTime: "",
        restTime: null,
        userId: null
    },
    onLoad: function(t) {
        this.fetchTypeList()
        this.getSettingData();
    },

    onShow: function() {
        var t = this.data.isRuning;
        t || this.getSettingData();
        var e = 60 * this.data.workTime * 1e3;
        Date.now() > e + this.data.startTime && t && (this.setData({
            completed: !0,
            isRuning: !1
        }), this.saveLog(this.data.log));
    },
    onHide: function() {
        this.data.isRuning;
        this.setData({
            hideFlag: !0
        });
    },
    fetchTypeList: function() {
        var t = this;
        wx.cloud.database().collection("tomato_category").get({
            success: function(e) {
                console.log(e);
                e.data.length > 0 ? t.setData({
                    taskTypeList: e.data
                }) : t.setData({
                    taskTypeList: []
                });
            }
        });
    },
    getSettingData: function() {
        var e = this;
        wx.cloud.database().collection("setting").get({
            success: function(a) {
                1 == a.data.length ? e.setData({
                    workTime: a.data[0].taskMinutes,
                    restTime: a.data[0].restMinutes
                }) : e.setData({
                    workTime: 1,
                    restTime: 5
                });
                var i = t.formatTime(e.data.workTime, "HH");
                t.formatTime(e.data.restTime, "HH");
                e.setData({
                    remainTimeText: i + ":00"
                });
            }
        });
    },
    startTimer: function(t) {
        var a = Date.now(), i = this.data.isRuning, s = t.target.dataset.index, n = this.data.workTime, o = 60 * n * 1e3, r = this.logName || this.data.taskTypeList[s].name, m = this.data.taskTypeList[s].id;
        i ? this.stopTimer() : this.timer = setInterval(function() {
            this.updateTimer(), this.startNameAnimation();
        }.bind(this), 1e3), this.setData({
            isRuning: !i,
            completed: !1,
            remainTimeText: n + ":00",
            taskName: r,
            startTime: Date.now()
        }), this.data.log = {
            typeName: r,
            startTime: Date.now(),
            keepTime: o,
            endTime: o + a,
            action: e[i ? "stop" : "start"],
            typeId: m
        };
    },
    
    startNameAnimation: function() {
        var t = wx.createAnimation();
        t.opacity(.2).step(), t.opacity(1).step(), this.setData({
            nameAnimation: t.export()
        });
    },
    pauseTimer: function(t) {},
    cancelTimer: function(e) {
        this.stopTimer();
        var a = t.formatTime(this.data.workTime, "HH");
        this.setData({
            remainTimeText: a + ":00"
        });
    },
    stopTimer: function(t) {
        this.setData({
            leftDeg: a.left,
            rightDeg: a.right,
            isRuning: !1
        }), this.timer && clearInterval(this.timer);
    },
    updateTimer: function() {
        var e = this.data.log, i = Date.now(), s = Math.round((e.endTime - i) / 1e3), n = t.formatTime(Math.floor(s / 3600) % 24, "HH"), o = t.formatTime(Math.floor(s / 60) % 60, "MM"), r = t.formatTime(Math.floor(s) % 60, "SS"), m = void 0;
        if (s > 0) {
            var h = ("00" === n ? "" : n + ":") + o + ":" + r;
            this.setData({
                remainTimeText: h
            });
        } else if (0 == s) return this.setData({
            completed: !0
        }), this.data.log = {
            typeName: e.typeName,
            startTime: e.startTime,
            endTime: e.keepTime + e.startTime,
            typeId: e.typeId
        }, this.saveLog(this.data.log), void this.stopTimer();
        1e3 * s > (m = e.keepTime / 2) ? this.setData({
            leftDeg: a.left - 180 * (i - e.startTime) / m
        }) : (this.setData({
            leftDeg: -135
        }), this.setData({
            rightDeg: a.right - 180 * (i - (e.startTime + m)) / m
        }));
    },
    // changeLogName: function(t) {
    //     this.logName = t.detail.value;
    // },
    saveLog: function(e) {
        var a = e;
        console.log(a);
        a.startTime = t.formatDate(new Date(e.startTime)), a.endTime = t.formatDate(new Date(e.endTime)), 
        wx.cloud.database().collection("tomato").add({
            data: a
        }).then(function(t) {
            console.log("添加记录成功!");
        });
    },
    onShareAppMessage: function(t) {
        return{
            title: "Tomato番茄闹钟",
            path: "/pages/index/index"

        };
    },
});