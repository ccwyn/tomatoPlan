Page({
    data: {
        categories: [],
        categoryIndex: 0,
        feedbackContent: null,
        tableID: 795
    },
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
    },
    onLoad: function(t) {
        this.fetchCategoryList();
    },
    bindCategoryChange: function(t) {
        this.setData({
            categoryIndex: t.detail.value
        });
    },
    fetchCategoryList: function() {
        var t = this, e = {
            tableID: this.data.tableID
        };
        wx.BaaS.getRecordList(e).then(function(e) {
            t.setData({
                categories: e.data.objects
            });
        }, function(t) {
            console.dir(t);
        });
    },
    submitFeedback: function(t) {
        var e = {
            tableID: 796,
            data: {
                categoryId: this.data.categories[this.data.categoryIndex].id,
                content: t.detail.value.textarea
            }
        };
        wx.BaaS.createRecord(e).then(function(e) {
            wx.showToast({
                title: "反馈成功",
                icon: "success",
                duration: 2e3
            }), t.detail.value.textarea = "", setTimeout(function() {
                wx.switchTab({
                    url: "/pages/setting/setting"
                });
            }, 2e3);
        }, function(t) {
            console.log(t);
        });
    }
});