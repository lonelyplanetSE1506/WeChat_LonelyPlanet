//我的收藏
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    col:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var opid = wx.getStorageSync('my_openID')
    wx.request({
      url: app.globalData.myUrl+'/reCollection/', //请求的URL地址
      method: "POST", //请求方式
      data: opid, //是否有数据传到服务器
      success: function (res) {
        //console.log(res.data);
        var listData = res.data.myCollectionList;
        console.log(listData)
        if (listData == null) {
          var toastText = "返回数据失败" + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: "",
            duration: 2000
          });
        } else {
          that.setData({
            list: listData
          })
        }
      }
    })
  }
})