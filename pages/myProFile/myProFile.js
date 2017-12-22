// pages/myProFile/myProFile.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chactImg: '',
    date: '1990-02-01',
    region: ['广东省', '广州市', '海珠区'],
    array: ['男', '女'],
    sex: 0,
    nickname: '',
    school: "",
    signature: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.baseInfomation(function (res) {
      if (res.status == 'ok') {
        // 昵称
        wx.getStorageSync('nickname') != "" ? that.setData({ nickname: wx.getStorageSync('nickname') }) : that.setData({ nickname: res.data.nickname })
        //性别
        wx.getStorageSync('sex') != "" ? that.setData({ sex: wx.getStorageSync('sex') }) : that.setData({ sex: res.data.sex })
        //生日
        wx.getStorageSync('date') != "" ? that.setData({ date: wx.getStorageSync('date') }) : that.setData({ date: "" })
        //地区
        wx.getStorageSync('region') != "" ? that.setData({ region: wx.getStorageSync('region') }) : that.setData({ region: "" })
        //大学
        wx.getStorageSync('school') != "" ? that.setData({ school: wx.getStorageSync('school') }) : that.setData({ school: res.data.school })
        //介绍
        wx.getStorageSync('signature') != "" ? that.setData({ signature: wx.getStorageSync('signature') }) : that.setData({ signature: res.data.signature })
        // 头像
        that.setData({
          chactImg: res.data.avatar
        })
      };
    })
    // 修改标题
    util.setTitle("我的资料")
  },
  //更改头像
  headPort: function () {
    var that = this;
    util.picture('/index.php/api/upfile/1/userinfo',function (tempFilePaths,data) {
      that.setData({
        chactImg: tempFilePaths[0]
      })
    })
  },
  // 修改昵称
  username: function (e) {
    wx.navigateTo({
      url: './username?name=' + e.currentTarget.id,
    })
  },
  // 日历控件
  bindDateChange: function (e) {
    wx.setStorageSync('date', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //地区
  bindRegionChange: function (e) {
    wx.setStorageSync('region', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //大学
  university: function (e) {
    wx.navigateTo({
      url: './university?name=' + e.currentTarget.id,
    })
  },
  //性别
  bindPickerChange: function (e) {
    wx.setStorageSync('sex', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  // 介绍
  textarea:function(e){
    wx.setStorageSync('signature', e.detail.value)
    this.setData({
      signature: e.detail.value
    })
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