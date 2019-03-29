const { $Message } = require('../../dist/base/index');

Page({
  data: {
    current: 'tab1',
    wish: [],
    commentList: [],
    wishid: 0
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      wishid: options.wishid
    })
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/weChatGetOneWish/' + this.data.wishid, //请求的URL地址
      method: "GET", //请求方式
      data: {}, //是否有数据传到服务器
      success: function (res) {
        var listData = res.data;
        if (listData == null) {
          var toastText = "返回数据失败" + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: "",
            duration: 2000
          });
        } else {
          that.setData({
            wish: listData.oneWish
          })
          wx.setNavigationBarTitle({ title: listData.oneWish.title })
        }
      }
    })
    //评论列表
    wx.request({
      url: 'http://localhost:8080/weChatgetComment/' + this.data.wishid,
      data: {},
      method: "GET",
      success: function (res) {
        console.log(res.data.commentsList)
        that.setData({
          commentList: res.data.commentsList,
        });
      }
    })
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

  }
});