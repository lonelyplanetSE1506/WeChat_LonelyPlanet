//初始页面
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  testBtn: function() {
    if (app.globalData.openid==null)
      return

    wx.request({//获取账号请求
      url: app.globalData.myUrl + '/getWeChatAccountInfo',
      method: "POST",
      data: app.globalData.openid,
      header: { "Content-Type": "application/json" },
      success: function (res) {
        console.log(res.data)
        wx.setStorage({
          key: 'my_openID',
          data: res.data.userInfo.openID
        })
        wx.setStorage({
          key: 'my_selfIntro',
          data: res.data.userInfo.selfIntro
        })
        wx.setStorage({
          key: 'my_wxNikeName',
          data: res.data.userInfo.wxNikeName
        })
        wx.setStorage({
          key: 'my_accountID',
          data: res.data.userInfo.accountID
        })
        wx.setStorage({
          key: 'my_account',
          data: res.data.userInfo
        })

        if (res.data.userInfo.wxNikeName=="Default")
        {
          wx.navigateTo({
            url: '/pages/editMyName/editMyName',
          })
        }
        else
        {
          wx.switchTab({
            url: '../new_shudong/new_shudong',//老用户跳转到树洞页面
          })
        }
      
      }
    })
  },

  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
        
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShow: function () {
  },
  weChatLogin: function () {
    var frmData = e.detail.value;
    var ip = "1001.01.10";
    var result = true;
    wx.request({//发送登录请求
      url: app.globalData.myUrl + '/weChatLogin',
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
                        url: app.globalData.myUrl + '/weChataddLog/' + ip + ':' + location,
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
            url: '../new_shudong/new_shudong',//跳转到树洞页面
          })
          //console.log(result)
        }
        else {
          wx.navigateTo({
            url: '../index/index',//仍然在初始界面
          })
          //console.log(result)
        }
      }
    })
  }
})
