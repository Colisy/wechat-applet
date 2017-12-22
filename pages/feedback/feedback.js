// pages/feedback/feedback.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lyric: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle('意见反馈')
  },
  // 歌词
  lyric: function (e) {
    this.setData({
      lyric: e.detail.value
    })
  },
  // 提交
  finish() {
    if (this.data.lyric!=""){
      util.feedback(this.data.lyric,(res)=>{
        util.tips('我们正在处理您提出的意见', () => {
          wx.navigateBack({
            delta: 1
          })
        })
      })
    }else{
      util.tips('意见不能为空哦',()=>{})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})