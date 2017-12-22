// pages/myProFile/username.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: options.name
    })
    // 修改标题
    util.setTitle("修改学校")
  },
  // 获取input值
  changeInput: function (e) {
    this.setData({
      username: e.detail.value
    })
    wx.setStorageSync("school", e.detail.value)
  },
  // 清空用户名
  clearInput: function () {
    wx.removeStorageSync('school')
    this.setData({
      username: ''
    })
  },
  // 修改大学
  inputConfirm: function () {
    wx.navigateBack({
      delta: 1
    })
    wx.setStorageSync("school", this.data.username)
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