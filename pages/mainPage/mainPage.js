Page({
  data: {
    list: []
    ,
    //动态界面图片地址
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg'
    ],
    //自动跳转，5秒延迟 
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  //点击“退出登录”按钮，回到登录界面
  zhuxiao: function () {
    console.log("注销")
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //点击“我的收藏”按钮，进入我的收藏页面
  shoucang: function () {
    console.log("进入我的收藏")
    wx.navigateTo({
      url: '../collocation/collocation',
    })
  },
  //右上角3个点，转发
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
      path: '/pages/mainPage/mainPage?id=' + that.data.scratchId,
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //显示个人信息
  onShow:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/AUser/', //请求的URL地址
      method: "GET", //请求方式
      data: {},  //是否有数据传到服务器
      success: function (res) {
        var listData = res.data.userList;
       // console.log(listData)
        if (listData==null){
          var toastText = "返回数据失败" + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: "",
            duration: 2000
          });
        }
        else{
          that.setData({
            list:listData
          })        
        }
      }
      })
      //console.log(list)  
  }
})
  