// pages/set/set.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    isDown:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    util.setTitle("设置")
    if (wx.getStorageSync('netPlay')){
      that.setData({
        isPlay:true
      })
    } else if (wx.getStorageSync('netDown')){
      that.setData({
        isDown: true
      })
    }
  },
  // 网络播放
  networkplay() {
    let that=this;
    that.setData({
      isPlay: !that.data.isPlay
    })
    if (that.data.isPlay){
      wx.setStorageSync('netPlay',true)
    }else{
      wx.removeStorageSync('netPlay')
    }
  },
  // 网络下载
  networkdownload() {
    let that = this;
    that.setData({
      isDown: !that.data.isDown
    })
    if (that.data.isDown) {
      wx.setStorageSync('netDown', true)
    } else {
      wx.removeStorageSync('netDown')
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})