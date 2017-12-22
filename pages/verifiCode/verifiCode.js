// pages/verifiCode/verifiCode.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    verify: '',
    seconde: 60,
    reSend: true,
    auth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this;
    this.resend();
    // 修改标题
    util.setTitle('获取验证码')
  },
  //封装发送
  sedmessage: function () {
    var that = this;
    util.countDown(that.data.seconde, function (res) {
      if (res > 1) {
        that.setData({
          seconde: res,
          reSend: false
        })
      } else {
        that.setData({
          reSend: true
        })
      }
    })
  },
  //重新发送
  resend: function () {
    var that=this;
    util.sendCode(wx.getStorageSync("username"), function (res) {
      if (res.status == 'ok') {
        util.tips(res.msg, function () {
          that.setData({
            reSend: true
          })
          that.sedmessage()
        })
      } else {
        util.tips('发送短信失败', function () {
          that.setData({
            reSend: false
          })
        })
      }
    })
  },
  //获取input的值
  verify: function (e) {
    this.setData({
      verify: e.detail.value
    })
  },
  // 清空input
  clearInput: function () {
    this.setData({
      verify: ''
    })
  },
  //点击完成
  finish: function () {
    var that = this;
    //非空验证
    if (that.data.verify == "") {
      util.tips('验证码不能为空', function () { })
    } else {
      // 调用注册接口
      if (wx.getStorageSync('register') == 'register') {
        util.regist(wx.getStorageSync('username'), wx.getStorageSync('password'), that.data.verify,this.data.auth, function (res) {
          wx.setStorageSync("skey", res.skey)
          if (res.msg == "该用户已存在") {
            util.tips('您已经登录过了', function () {
              wx.switchTab({
                url: '../home/home',
              })
            })
          } else if (res.status == 'ok') {
            util.tips('注册成功', function () {
              wx.switchTab({
                url: '../home/home',
              })
            })
          } else {
            util.tips(res.msg, function () { })
          }
        })
      }else{
        //接找回密码接口
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})