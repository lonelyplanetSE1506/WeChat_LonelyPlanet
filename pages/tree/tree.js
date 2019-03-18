// 树洞页面
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    //显示树洞页面标题“我的心愿”
    nodesa: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 30px;color:gold;font-size:30pt;'
      },
      children: [{
        type: 'text',
        text: '我的心愿'
      }]
    }],
  },
  //删除wish
  deleteWish: function(e) {
    //console.log(e.target.dataset.wishid);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除【 心愿:' + e.target.dataset.title + '吗？】',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'skyblue', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      success: function(sm) {
        wx.request({//发送删除请求
          url: 'http://localhost:8080/weChatDeleteWish/' + e.target.dataset.wishid,
          data: {},
          method: "GET",
          success: function(res) {
            if (sm.cancel) {
              wx.showToast({
                title: '取消删除',
              })
            } else {
              var result = res.data.success;
              var toastInfo = "删除成功！";
              if (result == false) {
                toastInfo = "删除失败！";
              } else {
                that.data.list.splice(e.target.dataset.index, 1);
                that.setData({
                  list: that.data.list
                });
              }
              wx.showToast({
                title: toastInfo,
                icon: '',
                duration: 2000
              });
            }

          }
        })
      }
    })
  },
  //右上角分享功能
  onShareAppMessage: function(res) {
    var that = this;
    return {
      title: '',
      path: '/pages/tree/tree?id=' + that.data.scratchId,
      success: function(res) {
        // 转发成功

        that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    /*
    console.log(e)
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });*/
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/reWish/', //请求的URL地址
      method: "GET", //请求方式
      data: {}, //是否有数据传到服务器
      success: function(res) {
        var listData = res.data.mywishList;
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
            list: listData
          })
        }
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})