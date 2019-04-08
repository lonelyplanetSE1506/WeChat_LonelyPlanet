
//获取应用实例
const app = getApp()
Page({
  data: {
    switch1: true,
    nikename: ""
  },

  onLoad: function () {
    var that = this

    wx.request({
      url: app.globalData.myUrl + '/AUser',
      data: {},
      method: 'GET',
      success: function (r) {
      
        that.setData({
          nikename: r.data.userList[0].nikeName
        });
      }
    })
    console.log(that.data.nikename)
  }
});