
//获取应用实例
const app = getApp()
Page({
  data: {
    switch1: true,
    nikename: ""
  },

  onShow: function () {
    var that = this

    that.setData({
      nikename: wx.getStorageSync('my_nikeName')
    });
    console.log(that.data.nikename)
  }
});