// pages/mycl/mycl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wish: [],
    commentsList: [],
    myid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var collectionid = options.collectionid;
    //console.log(collectionList)
    wx.request({//发送请求，显示“收藏”内容
      url: 'http://localhost:8080/weChatgetCollection/' + collectionid,
      data: {},
      method: 'GET',
      success: function (r) {
        var re=r.data;
        that.setData({
          wish: re.wish,
          commentsList: re.commentsList,
          myid:collectionid
        });

      }
    })
  },
  //取消收藏
  deleteCollection:function(e){
    console.log(e)
    var collectionID=e.currentTarget.dataset.cid
    console.log(collectionID)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除【'+ e.target.dataset.title + '吗？】',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      success: function (sm) {
        wx.request({
          url: 'http://localhost:8080/weChatDeleteCollection/' + collectionID,
          data: {},
          method: "GET",
          success: function (res) {
            if (sm.cancel) {
              wx.showToast({
                title: '取消删除',
              })
            }
            else {
              var result = res.data.success;
              var toastInfo = "删除成功！";
              if (result == false) {
                toastInfo = "删除失败！";
              }
              wx.showToast({
                title: toastInfo,
                icon: '',
                duration: 2000
              });
              //删除完毕，跳转到“我的收藏”页面
              wx.navigateTo({
                url: '../collocation/collocation',
              })
            }

          }
        })
      },
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
  
  }
})