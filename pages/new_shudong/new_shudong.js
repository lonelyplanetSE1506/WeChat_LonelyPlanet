const { $Message } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    list: [],
    showTab1: true,
    showTab2: false
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key=="tab1"){
      this.setData({
        showTab1: true,
        showTab2: false
      });
    }
    else {
      this.setData({
        showTab1: false,
        showTab2: true
      });
    }
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.myUrl+'/PublicWish/', //请求的URL地址
      method: "GET", //请求方式
      data: {}, //是否有数据传到服务器
      success: function (res) {
        var listData = res.data;

        console.log(res.data)
        console.log(listData)
        if (listData == null) {
          var toastText = "返回数据失败" + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: "",
            duration: 2000
          });
        } else {
          that.setData({
            list: listData.publicWishList,
          })
        }
      }
    })
    //console.log(list)  

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

  tapOneWish:function(e){
    wx.navigateTo({
      url: '/pages/new_onewish/new_onewish?wishid=' + e.currentTarget.dataset.wishid
    })
  }
});