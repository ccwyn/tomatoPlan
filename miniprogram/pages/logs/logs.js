getApp();

Page({
  data: {
    records: [],
    hasMore: false,
    pageIndex: 0,
    total: 0,
    totalPage: 1,
    openid: "",
  },
  onShareAppMessage: function (t) {
    return {
      imageUrl: "../../image/timg.jpg",
      title: "Tomato番茄闹钟",
      path: "/pages/logs/logs",
    };
  },
  onLoad: function () {
    this.getOpenid();
  },
  onShow: async function () {
    if(!this.data.openid){
      await this.getOpenid()
    }
    this.getData(this.data.pageIndex + 1);
  },
  onReachBottom: function () {
    console.log("到底");
    if (this.data.hasMore) {
      this.getData(this.data.pageIndex + 1);
    }
  },
  // 获取用户openid
  async getOpenid() {
    const res = await wx.cloud.callFunction({ name: "getUserInfo" });
    console.log("云函数获取到的openid: ", res.result.openid);
    this.setData({
      openid: res.result.openid,
    });
  },
  getData(pageIndex = 1) {
    wx.cloud
      .callFunction({
        name: "paginator",
        data: {
          dbName: "tomato",
          pageIndex: pageIndex,
          pageSize: 10,
          filter: {
            _openid: this.data.openid,
          },
        }
      })
      .then((res) => {
        console.log(res);
        const { data, hasMore, pageIndex, total, totalPage } = res.result;
        this.setData({
          records: [...this.data.records, ...data],
          hasMore,
          pageIndex,
          total,
          totalPage,
        });
      });
  },
});
