
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    openid: null
  },

  onLoad: function () {
    var _this = this;
    wx.getStorage({
      key: 'my_openID',
      success: function (res) {
        _this.setData({
          openid: res.data
        })
        console.log("openid: "+_this.data.openid)
      },
    })
  },

  join: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8080/chat/random',
      method: 'POST',
      success: function (e) {
        console.log("e.data.data: " + e.data.data)
        wx.navigateTo({
          url: '/pages/chat/chat?to=' + e.data.data,
        })
      }
    })

  }

})
