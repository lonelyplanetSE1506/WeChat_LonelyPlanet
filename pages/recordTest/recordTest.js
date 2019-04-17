// pages/recordTest/recordTest.js

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordStatus:0,
    btnStr:["开始","暂停","继续"]
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

  //开始录音的时候
  start: function () {

    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    this.setData({
      recordStatus:0
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //录音按钮
  clickRecordBtn: function() {
    var that = this
    var recStatus = that.data.recordStatus
    if(recStatus==0)
    {
      that.setData({
        recordStatus:1
      })
      that.start()
    }
    else if(recStatus==1)
    {
      console.log("暂停录音")
      that.setData({
        recordStatus: 2
      })
      recorderManager.pause();
    }
    else if (recStatus == 2) {
      console.log("继续录音")
      that.setData({
        recordStatus: 1
      })
      recorderManager.resume()
    }
  }
})