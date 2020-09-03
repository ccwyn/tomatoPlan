getApp();

Page({
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "Scrum番茄闹钟",
            path: "/pages/index/index",
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
    }
});