const { $Message } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    list: [],
    hot_list: [],
    showTab1: true,
    showTab2: false
  },
  
  collection: function (e) {
    console.log(e)
    var that = this
    var opid = wx.getStorageSync('my_openID')
    var wishid = e.currentTarget.dataset.wishid
    wx.request({
      url: app.globalData.myUrl + '/isCollection/',
      data: { openid: opid, wishid: wishid },
      method: 'POST',
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
    that.onShow()
    that.onShow()
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this;
    var id = wx.getStorageSync('my_accountID')
    wx.request({
      url: app.globalData.myUrl+'/PublicWish/', //请求的URL地址
      method: "POST", //请求方式
      data: id, //是否有数据传到服务器
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
    wx.request({
      url: app.globalData.myUrl + '/Top10Wish/', //请求的URL地址
      method: "POST", //请求方式
      data: id, //是否有数据传到服务器
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
            hot_list: listData.top10WishList,
          })
        }
      }
    })
  },


  tapOneWish:function(e){
    wx.navigateTo({
      url: '/pages/new_onewish/new_onewish?wishid=' + e.currentTarget.dataset.wishid
    })
  }
});