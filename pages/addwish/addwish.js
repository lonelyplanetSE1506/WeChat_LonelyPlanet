//添加心愿
//获取应用实例
const app = getApp()
const { $Toast } = require('../../dist/base/index');
Page({
  data: {
    wish: {title:"", permision:"true", content:""},
    visiable: true
  },

  testSubmit(e) {
    var that = this
    var wish = this.data.wish
    console.log('wish', wish)

    var opid = wx.getStorageSync('my_openID')

    if(wish.title=="" || wish.content=="")
    {
      $Toast({
        content: '内容不能为空',
        type: 'warning'
      });
      return 
    }

    //frmData = {content:"test", permision:"true",title:"title"}
    wx.request({//发送添加心愿请求
      url: app.globalData.myUrl + '/weChatAddWish',
      method: "POST",
      data: {openid: opid, wish: JSON.stringify(wish)},//{"email":"Kobe","password":"12345678"}
      header: { "Content-Type": "application/json" },
      success: function (res) {
        that.setData({
          "wish.title": "",
          "wish.content":"",
          "wish.permision":"true",
          visiable:true
        })
        $Toast({
          content: '发布成功',
          type: 'success'
        });
        wx.switchTab({
          url: '../new_shudong/new_shudong',
        })
      }
    })
  },

  titleInputChange(e) {
    //console.log(e.detail.detail.value)
    this.setData({
      "wish.title": e.detail.detail.value
    })
  },
  contentInputChange(e) {
    //console.log(e.detail.detail.value)
    this.setData({
      "wish.content": e.detail.detail.value
    })
  },
  onChange(e) {
    if (e.detail.value)
      this.setData({
        "wish.permision": "true",
        visiable:true
      })
    else
      this.setData({
        "wish.permision": "false",
        visiable:false
      })
    console.log('switch发生change事件，携带value值为：', this.data.wish)

  }
})