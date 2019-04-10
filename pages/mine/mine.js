
//获取应用实例
const app = getApp()
Page({
  data: {
    switch1: true,
    nikename: ""
  },

  onShow: function () {
    var that = this

    wx.getStorage({
      key: 'my_nikeName',
      success(res) {
        console.log(res.data)
        that.setData({
          nikename: res.data
        });
      }
    })
    console.log(that.data.nikename)
  }
});