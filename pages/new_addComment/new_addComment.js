// pages/new_addComment/new_addComment.js
//获取应用实例
const app = getApp()
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmcontent: "",
    wishid: 0,
    accountID: {}
  },
  cmcontentInputChange(e) {
    this.setData({
      cmcontent: e.detail.detail.value
    })
    console.log(this.data.cmcontent)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      wishid: options.wishid
    })
    console.log(this.data.wishid)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //添加评论
  addcomment: function (e) {
    var that = this;
    var opid = wx.getStorageSync('my_openID')
    var wishid = that.data.wishid
    var cmcontent = that.data.cmcontent;

    if (cmcontent == "") {
      $Toast({
        content: '内容不能为空',
        type: 'warning'
      });
      return
    }

    console.log(cmcontent);
    wx.request({
      url: app.globalData.myUrl+'/weChatAddComment/',
      data: {openid:opid,wishid:wishid, cmcontent:cmcontent},
      method: "POST",
      success: function (res) {
        $Toast({
          content: '评论成功',
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