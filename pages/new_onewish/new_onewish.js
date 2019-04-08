const { $Message } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    wish: [],
    commentList: [],
    wishid: 0,
    isLiked: 0,
    likeStr: "收藏"
  },

  handleLike() {
    
    var that = this

    wx.request({
      url: app.globalData.myUrl + '/isCollection/' + this.data.wishid,
      data: {},
      method: 'GET',
      success: function (r) {
        console.log(r.data)
        if (r.data == true) {
          that.setData({
            isLiked: true,
            likeStr: "已收藏"
          });
          $Message({
            content: '收藏成功！',
            type: 'info'
          });
        }
        else {
          that.setData({
            isLiked: false,
            likeStr: "收藏"
          });
          $Message({
            content: '取消收藏',
            type: 'info'
          });
        }
      }
    })

  },

  handleComment: function () {
    wx.navigateTo({
      url: '/pages/new_addComment/new_addComment?wishid=' + this.data.wishid
    })
  },

  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      wishid: options.wishid
    })

    wx.request({
      url: app.globalData.myUrl + '/checkCollection/' + this.data.wishid,
      data: {},
      method: 'GET',
      success: function (r) {
        console.log(r.data)
        if (r.data == true) {
          that.setData({
            isLiked: true,
            likeStr: "已收藏"
          });
        }
        else {
          that.setData({
            isLiked: false,
            likeStr: "收藏"
          });
        }
      }
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
      url: app.globalData.myUrl+'/weChatGetOneWish/' + this.data.wishid, //请求的URL地址
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
      url: app.globalData.myUrl +'/weChatgetComment/' + this.data.wishid,
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