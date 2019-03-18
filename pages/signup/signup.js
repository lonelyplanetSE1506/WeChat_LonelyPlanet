// 注册界面

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  signupSubmit: function (e) {
    var frmData = e.detail.value;
    wx.request({//注册请求
      url: 'http://localhost:8080/weChatSignup',
      method: "POST",
      data: JSON.stringify(frmData), //{"email":"Kobe","password":"12345678"}
      header: {
        "Content-Type": "application/json"
      },
      //成功
      success: function (res) {
        //console.log(res);
        var result = res.data;
        console.log(result)
        //注册成功
        if (result == 0) {
          wx.request({
            url: 'http://ip-api.com/json',
            success: function (e) {
              // console.log(e.data);
              //console.log(e.data.query);
              //写日志
              var ip = e.data.query;
              wx.getLocation({ //没有特别说明的都是固定写法
                type: 'wgs84',
                success: function (res) {
                  // console.log('location', res);
                  var locationString = res.latitude + "," + res.longitude;
                  //          //纬度                          //经度
                  wx.request({
                    url: 'http://apis.map.qq.com/ws/geocoder/v1/',
                    data: {
                      "key": "XALBZ-4MQE6-ONDSP-E5QS2-YLAR2-VCFZV", //密钥
                      "location": locationString
                    },
                    method: 'GET',
                    success: function (r) {
                      var location = r.data.result.address_component.nation + r.data.result.address_component.province +
                        r.data.result.address_component.city + r.data.result.address_component.district;
                      wx.request({
                        url: 'http://localhost:8080/weChataddLog/' + ip + ':' + location,
                        data: {},
                        method: "GET",
                        success: function () {
                        }
                      })
                    }
                  });
                }
              });
            }
          });
          wx.switchTab({
            url: '../mainPage/mainPage', //跳转到主页
          })
          //console.log(result)
        } 
        //email已经注册过,昵称没有注册过
        else if(result==1){
          wx.showToast({
            title: 'email已经注册过',
            icon: '',
            duration: 2000
          })
        }
        //昵称已经注册过,email没有注册过
        else if(result==2){
          wx.showToast({
            title: '昵称已经注册过',
            icon: '',
            duration: 2000
          })
        }
        //昵称和email都注册过
        else{
          wx.showToast({
            title: '昵称和email都注册过',
            icon: '',
            duration: 2000
          })
        }
      }
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