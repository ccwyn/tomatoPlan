getApp();

Page({
  data: {
    records: [],
    hasMore:false,
    pageIndex:1,
    total:0,
    totalPage:1
  },
  onShareAppMessage: function (t) {
    return {
      imageUrl:'../../image/timg.jpg',
      title: "Tomato番茄闹钟",
      path: "/pages/logs/logs"
    };
  },
  onShow: function () {
    this.getData();
  },
  onLoad: function () {},
  onReachBottom: function () {
      console.log('到底');
      if(this.data.hasMore){
        this.getData(this.data.pageIndex+1);
      }
    
  },
  getData (pageIndex=1) {
    wx.cloud
      .callFunction({
        name: "paginator",
        data: {
          dbName: "tomato",
          pageIndex: pageIndex,
          pageSize: 10,
        },
      })
      .then((res) => {
        console.log(res);
        const { data, hasMore, pageIndex, total, totalPage } = res.result;
        this.setData({
          records: [...this.data.records,...data],
          hasMore,
          pageIndex,
          total,
          totalPage,
        });
      });
  },
});
