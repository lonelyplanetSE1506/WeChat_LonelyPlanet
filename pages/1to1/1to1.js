// pages/1to1/1to1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 10000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前窗口的高度
    //var height = wx.getSystemInfoSync().windowHeight;
    /**下面的是我封装的一个http请求
    App.HttpService.getReturnVisitRecordList(options.id).then(res => {
      //res 是请求成功后返回的数据
      if (res.data.code === 0) {
        var length = res.data.data.length
        that.setData({
          // 将获取的List赋值给recordList
          'recordList': res.data.data,
          // 1.计算页面上每一个item的标签的高
          // 2.用数组的获取的List的长度*每个item标签的高度（400是我目测的，说白了就是瞎写的，反正肯定比每个item的高度高，只要够高就行。）
          'scrollTop': length * 400
        })
      }
    })
    **/
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

  }
})