//添加心愿
Page({
  data: {
    //添加权限，1为所有人可见，0为仅自己可见
    items: [
      { name: true, value: '所有人' },
      { name: false, value: '仅自己', checked: 'true' },
    ]
  },
  //改变权限
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //点击“添加心愿”按钮，添加成功，跳转到“树洞”页面
  tjxy:function(){
    wx.switchTab({
      url: '../tree/tree',
    })
    wx.showToast({
      title: '保存成功！',
      icon: "",
      duration: 2000
    });
  },
  //点击“添加心愿”按钮，链接后台，触发添加事件
  frmAddwish:function(e){
    console.log(e);
    var frmData = e.detail.value;
   console.log(frmData);
   wx.request({//发送添加心愿请求
     url: 'http://localhost:8080/weChatAddWish',
     method: "POST",
     data: JSON.stringify(frmData),//{"email":"Kobe","password":"12345678"}
     header: { "Content-Type": "application/json" },
     success: function (res) {
       wx.showToast({
         title: '保存成功！',
         icon: "",
         duration: 5000,
       });
       wx.switchTab({
         url: '../tree/tree',
       })
     }
   })
  }
})