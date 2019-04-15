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
  /*
  collection: function (e) {
    console.log(e)
    var that = this;
    var wishid = e.currentTarget.dataset.wishid;
    var index = e.currentTarget.dataset.index;
    var gg = e.currentTarget.dataset.list[index].hasCollection;
    var num = e.currentTarget.dataset.list[index].wish.collectionNum;
    console.log(gg);
    e.currentTarget.dataset.list[index].hasCollection = !gg;
    gg = e.currentTarget.dataset.list[index].hasCollection;//修改index的isGood的值
    console.log(gg);
    //console.log(that.data)
    wx.request({
      url: app.globalData.myUrl + '/isCollection/' + wishid,
      data: {},
      method: 'GET',
      success: function (r) {
        console.log(r.data)
        //console.log(that.list)
        if (r.data == true) {
          num = num + 1;
          e.currentTarget.dataset.list[index].wish.collectionNum = num;
          that.setData({
            list: e.currentTarget.dataset.list
          });
          wx.showToast({
            title: "收藏成功",
            icon: '',
            duration: 2000
          });
        }
        else {
          num = num - 1;
          e.currentTarget.dataset.list[index].wish.collectionNum = num;
          that.setData({
            list: e.currentTarget.dataset.list
          });
          wx.showToast({
            title: "已经取消收藏！",
            icon: '',
            duration: 2000
          });
        }
      }
    })
  },*/

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
    wx.request({
      url: app.globalData.myUrl + '/Top10Wish/', //请求的URL地址
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