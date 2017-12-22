// pages/forgetPass/forgetPass.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    isShow:false,
    auth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 是否是微信登录
    if (options.auth === undefined) {
      this.setData({
        auth:undefined
      })
    }else{
      this.setData({
        auth: options.auth
      })
    }
    //判断是从哪个页面过来的
    if (wx.getStorageSync('register') == 'register') {
      this.setData({
        isShow:true
      })
      // 修改标题
      util.setTitle('手机号注册')
    } else if (wx.getStorageSync('register') == 'forgetPass') {
      this.setData({
        isShow: false
      })
      // 修改标题
      util.setTitle('重设密码')
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
  //发送验证码
  verifyCode: function () {
    var that = this;
    // 非空验证
    if (that.data.username == "") {
      util.tips("手机号不能为空", function () { })
    } else if (that.data.password == "") {
      util.tips("密码不能为空", function () { })
    } else if (!util.phone.test(that.data.username)) {   //手机号格式是否正确
      util.tips("手机号格式不正确", function () { })
    } else {
      //存储手机号和密码
      wx.setStorageSync("username", that.data.username)
      wx.setStorageSync("password", that.data.password)
     //发送短信
      util.sendCode(that.data.username,function(res){
        if(res.status=='ok'){
          // 不是微信登录
          if (that.data.auth === undefined) {
            wx.navigateTo({
              url: '../verifiCode/verifiCode'
            })
          }else{
            wx.navigateTo({
              url: '../verifiCode/verifiCode?auth=' + that.data.auth
            })
          }
         
        }else{
          util.tips('发送短信失败', function () { })
        }
      })
    }
    
  }
})