// pages/shudong/shudong.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    //按钮颜色
    good: ["yellow"],
    nogood: ["white"],
    collection: ["yellow"],
    nocollection: ["white"],
    show: ["yellow"],
    noshow: ["white"],
    commentList: [],
    chioceFilter: false,
  },
  //显示评论
  comment: function (e) {
    console.log(e)
    var that = this;
    var wishid = e.currentTarget.dataset.wishid;
    var index = e.currentTarget.dataset.index;
    var gg = e.currentTarget.dataset.list[index].show;
    console.log(gg);
    e.currentTarget.dataset.list[index].show = !gg;
    console.log(e.currentTarget.dataset.list[index].show);
    //gg=e.currentTarget.dataset.list[index].hasCollection;
    //修改index的show的值
    //console.log(gg);
    //console.log(this.data.chioceFilter)
    //console.log(e.currentTarget.dataset.item)
    if (gg == false)
      //返回list
      // console.log(e)
      wx.request({
        url: app.globalData.myUrl+'/weChatgetComment/' + wishid,
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
    else {
      that.setData({
        list: e.currentTarget.dataset.list,
      });
    }
  },
  //添加评论
  addcomment: function (e) {
    var that = this;
    console.log(that);
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var wishid = e.currentTarget.dataset.list[index].wish.wishID;
    //e.target.dataset.wishid,
    console.log(wishid)
    var cmcontent = e.detail.value.CMContent;
    //console.log(cmcontent);
    var frmData = e.detail.value;
    console.log(frmData);
    wx.request({
      url: app.globalData.myUrl+'/weChatAddComment/' + wishid + ':' + cmcontent,
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
  },
  //确认
  filterButtonClick: function () {
    this.setData({
      chioceFilter: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /*
  点赞*/
  good: function (e) {
    console.log(e)
    var that = this;
    var wishid = e.currentTarget.dataset.wishid;
    var index = e.currentTarget.dataset.index;
    var gg = e.currentTarget.dataset.list[index].hasGood;
    var num = e.currentTarget.dataset.list[index].wish.goodNum;
    console.log(gg);
    e.currentTarget.dataset.list[index].hasGood = !gg;
    gg = e.currentTarget.dataset.list[index].hasGood;//修改index的isGood的值
    console.log(gg);
    //console.log(that.data)
    wx.request({
      url: app.globalData.myUrl+'/isGood/' + wishid,
      data: {},
      method: 'GET',
      success: function (r) {
        console.log(r.data)
        //console.log(that.list)
        if (r.data == true) {
          num = num + 1;
          e.currentTarget.dataset.list[index].wish.goodNum = num;
          that.setData({
            list: e.currentTarget.dataset.list
          });
          wx.showToast({
            title: "点赞成功",
            icon: '',
            duration: 2000
          });
        }
        else {
          num = num - 1;
          e.currentTarget.dataset.list[index].wish.goodNum = num;
          that.setData({
            list: e.currentTarget.dataset.list
          });
          wx.showToast({
            title: "已经取消点赞！",
            icon: '',
            duration: 2000
          });
        }
      }
    })
  },
  /*
  收藏
  */
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
      url: app.globalData.myUrl+'/isCollection/' + wishid,
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

  }
})