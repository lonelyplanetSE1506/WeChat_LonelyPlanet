// pages/new_addComment/new_addComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CMContent: '',
    wishid: 0,
    accountID: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      wishid: options.wishid
    })
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
  //添加评论  待完成
  addcomment: function (e) {
    var that = this;
    var wishid = e.currentTarget.dataset.wishid;
    //e.target.dataset.wishid,
    console.log(wishid)
    var cmcontent = e.currentTarget.dataset.CMContent;
    //console.log(cmcontent);
    var frmData = e.detail.value;
    console.log(frmData);
    wx.request({
      url: 'http://localhost:8080/weChatAddComment/' + wishid + ':' + cmcontent,
      data: {},
      method: "GET",
      success: function (res) {
        console.log(res.data.commentsList)
        that.setData({
          commentList: res.data.commentsList,
          list: e.currentTarget.dataset.list,
        });
      }
    })
  }
})