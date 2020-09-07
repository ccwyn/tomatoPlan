// 云函数-分页
// https://blog.csdn.net/qq_41619567/article/details/84103414
const cloud = require("wx-server-sdk");
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter || {};
  var pageIndex = event.pageIndex || 1;
  var pageSize = event.pageSize || 10;
  const countResult = await db.collection(dbName).where(filter).count();
  const total = countResult.total;
  const totalPage = Math.ceil(total / 10);
  var hasMore;
  if (pageIndex >= totalPage) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  return db
    .collection(dbName)
    .where(filter)
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .get()
    .then((res) => {
      res.hasMore = hasMore;
      res.total = total;
      res.totalPage = totalPage;
      res.pageIndex = pageIndex;
      return res;
    });
};
