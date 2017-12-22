// pages/personCenter/personCenter.js
var util = require('../../utils/util.js');
Page({
  //分享
  onShareAppMessage: function (res) {
    return {
      title: '中国儿童音乐网',
      path: 'pages/home/home',
      success: function (res) {
        // 转发成功
        util.tips('转发成功', function () { });
      },
      fail: function (res) {
        // 转发失败
        util.tips('转发失败', function () { });
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    alreadyLogin: false,
    character: '',
    chactImg: "" //头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.baseInfomation(function (data) {
      if (data.status == 'ok') {
         // vip
        wx.setStorageSync('isVip', data.data.group_id)
        wx.setStorageSync("viptime", data.data.viptime)
        wx.setStorageSync('uid', data.data.uid)
        that.setData({
          alreadyLogin: true,
          character: data.data,
          chactImg: data.data.avatar
        })
      } else {
        that.setData({
          alreadyLogin: false
        })
      }
    })
    // 修改标题
    util.setTitle('个人中心')
  },
  // 设置
  setpage(){
    wx.navigateTo({
      url: '../set/set',
    })
  },
  // 进去vip页面
  gotovip() {
    wx.navigateTo({
      url: '../vip/vip',
    })
  },
  // 我的下载页面
  gotodownload(){
    wx.navigateTo({
      url: '../recentPlay/recentPlay?back=download',
    })
  },
  // 我的收藏页面
  gotocollect() {
    wx.navigateTo({
      url: '../recentPlay/recentPlay?back=collect',
    })
  },
  // 最近播放页面
  recentplay() {
    wx.navigateTo({
      url: '../recentPlay/recentPlay?back=recentPlay',
    })
  },
  // 意见反馈
  feedback() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  // 立即登录
  immediateLogin: function () {
    wx.navigateTo({
      url: '../selectLogin/selectLogin',
    })
  },
  // 拨打电话
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '010-58444882'
    })
  },
  // 退出登录
  outTap: function () {
    var that = this;
    util.logOut(function (res) {
      if (res.status == 'ok') {
        util.tips('成功退出登录', function () {
          wx.removeStorageSync('skey')
          that.setData({
            alreadyLogin: false
          })
        })
      } else {
        util.tips(res.msg, function () { })
      }
    })
  },

  //关于我们
  aboutus: function () {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  // 我的资料
  myProFile: function () {
    wx.navigateTo({
      url: '../myProFile/myProFile',
    })
  },
  // 个性换肤
  changeSkin: function () {
    wx.navigateTo({
      url: '../changeSkin/changeSkin',
    })
  }
})