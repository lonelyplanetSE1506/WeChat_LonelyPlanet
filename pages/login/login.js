//登录界面
const util = require('../../utils/util.js')
const self = this
Page({
  frmSubmit: function (e) {
    var frmData = e.detail.value;
    var ip = "1001.01.10";
    var result = true;
    wx.request({//发送登录请求
      url: 'http://localhost:8080/weChatLogin',
      method: "POST",
      data: JSON.stringify(frmData),//{"email":"Kobe","password":"12345678"}
      header: { "Content-Type": "application/json" },
      success: function (res) {
        //console.log(res)
        result = res.data;
        //console.log(result)
        if (result == true) {
          wx.request({
            url: 'http://ip-api.com/json',
            success: function (e) {
              // console.log(e.data);
              //console.log(e.data.query);
              ip = e.data.query;
              wx.getLocation({ //没有特别说明的都是固定写法
                type: 'wgs84',
                success: function (res) {
                  // console.log('location', res);
                  var locationString = res.latitude + "," + res.longitude;
                  //          //纬度                          //经度
                  wx.request({
                    url: 'http://apis.map.qq.com/ws/geocoder/v1/',
                    data: {
                      "key": "XALBZ-4MQE6-ONDSP-E5QS2-YLAR2-VCFZV",//密钥
                      "location": locationString
                    },
                    method: 'GET',
                    success: function (r) {
                      
                      location = r.data.result.address_component.nation + r.data.result.address_component.province +
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
            //  console.log(1);
            }
          });
          wx.switchTab({
            url: '../mainPage/mainPage',//跳转到主页
          })
          //console.log(result)
        }
        else {
          wx.navigateTo({
            url: '../login/login',//仍然在登录界面
          })
          //console.log(result)
        }
      }
    })
  },
  //点击登录按钮
  mainPage: function () {
    console.log("进入个人主页")
    wx.switchTab({
      url: '../mainPage/mainPage',
    })
  },
  //点击注册按钮
  signup: function () {
    console.log("进入注册界面")
    wx.navigateTo({
      url: '../signup/signup',
    })
  }
})