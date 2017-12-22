// pages/login/login.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: '',
    auth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 修改标题
    util.setTitle('手机号登录')
    // 是否是微信登录
    if (options.auth === undefined) {
      this.setData({
        auth: undefined
      })
    } else {
      this.setData({
        auth: options.auth
      })
    }
  },
  // 用户名
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  //密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //忘记密码
  forgetPassword: function () {
    wx.setStorageSync('register', 'forgetPass');
    wx.navigateTo({
      url: '../forgetPass/forgetPass'
    })
  },
  //清空用户名
  clearInput: function () {
    this.setData({
      username: ''
    })
  },
  //清空密码
  clearpassword: function () {
    this.setData({
      password: ''
    })
  },
  //登录
  loginCommit: function () {
    var that = this;
    // 非空验证
    if (that.data.username == "") {
      util.tips("手机号不能为空", function () { })
    } else if (that.data.password == "") {
      util.tips("密码不能为空", function () { })
    // } else if (!util.phone.test(that.data.username)) {   //手机号格式是否正确
    //   util.tips("手机号格式不正确", function () { })
    } else {
    if(that.data.auth===undefined){
      util.wxLogin(that.data.username, that.data.password, function (res) {
        if (res.data.status == 'ok') {
          wx.setStorageSync("skey", res.data.skey)
          util.tips("登录成功", function () {
            wx.reLaunch({
              url: '../home/home',
            })
          });
        } else {
          if (res.data.msg == "请勿重复登录") {
            util.tips(res.data.msg, function () {
              wx.navigateTo({
                url: '../home/home',
              })
            });
          } else {
            util.tips(res.data.msg, function () { });
          }
        }
      });
    }else{
      util.wxBind(that.data.username, that.data.password,that.data.auth, function (res) {
        util.tips('登录成功', function () {
          wx.switchTab({
            url: '../home/home',
          })
         });
      });
    }
       
    }

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