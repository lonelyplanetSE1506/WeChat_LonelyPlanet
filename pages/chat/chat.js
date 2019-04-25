var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    input:null,
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'my_openID',
      success: function(res) {
        _this.setData({
          openid:res.data
        })
      },
    })
    var _this = this;
    //建立连接
    wx.connectSocket({
      url: "ws://localhost:8080/websocket/"+_this.data.openid+"/"+options.to,
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('连接成功');
    })
    wx.onSocketMessage(function(res){
      
       var list = [];
       list = _this.data.newsList;
      var  _data = JSON.parse(res.data);
     
       list.push(_data);
       console.log(list)
       _this.setData({
         newsList:list
       })
       
    })
  },

  send :function(){
    var _this = this;
    if(_this.data.input){
    wx.sendSocketMessage({
      data: _this.data.input,
    })
    var list = [];
    list = this.data.newsList;
    var temp = { 'message': _this.data.input, 'date': utils.formatTime(new Date()), type: 0 };
    list.push(temp);
    this.setData({
      newsList:list,
      input:null
    })
    }
    
  },
  bindChange:function(res){
    this.setData({
      input: res.detail.value
    })
  },
  back:function(){
    wx.closeSocket();
    console.log('连接断开');
  }
})