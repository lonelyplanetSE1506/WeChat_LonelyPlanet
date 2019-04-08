
//获取应用实例
const app = getApp()
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountName:""
  },
  nameInputChange(e) {
    this.setData({
      accountName: e.detail.detail.value
    })
    console.log(this.data.accountName)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      accountName: options.name
    })
    console.log(this.data.accountName)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //修改昵称
  addName: function (e) {
    var that = this;
    var name = that.data.accountName;
    console.log(name);
    wx.request({
      url: app.globalData.myUrl + '/weChataddName/'+ name,
      data: {},
      method: "GET",
      success: function (res) {
        $Toast({
          content: '修改成功',
          type: 'success'
        });
        wx.navigateBack({
          delta: 1//想要返回的层级
        })
      }
    })
  },

  backClick() {
    wx.navigateBack({
      delta: 1//想要返回的层级
    })
  }
})