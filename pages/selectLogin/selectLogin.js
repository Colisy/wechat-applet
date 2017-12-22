// pages/selectLogin/selectLogin.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 修改标题
    util.setTitle('登录飞猪星球儿童音乐')
    //发起网络请求
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx01d8bb1584f500bd&secret=bfd26c55657672c77ce49109b5338129&js_code=' + res.code + '&grant_type=authorization_code',
            header: { 'content-Type': 'application/json' },
            success: function (res) {
              wx.request({
                url: util.address + '/index.php/api/wxapp/login',
                method: 'POST',
                data: {
                  "openid": res.data.openid,
                  "session_key": res.data.session_key
                },
                header: { 'content-Type': 'application/json' },
                success: function (data) {
                  if (data.data.status == 'ok') {
                    wx.setStorageSync("openid", res.data.openid)
                    if (data.data.code == '0002') {
                      // 弹窗
                      wx.showModal({
                        content: '已有账号？立即登录',
                        cancelText: '去注册',
                        confirmText: '去登录',
                        showCancel: true,
                        confirmColor: "#ff5045",
                        success: function (data) {
                          // 点击确定
                          if (data.confirm) {
                            wx.navigateTo({
                              url: '../login/login?auth=' + res.data.openid,
                            })
                          } else if (data.cancel) {
                            wx.navigateTo({
                              url: '../forgetPass/forgetPass?auth=' + res.data.openid,
                            })
                          }
                        }
                      })
                    } else if (data.data.code == '0000') {
                      if(wx.getStorageSync("skey")===""){
                        wx.navigateTo({
                          url: '../login/login',
                        })
                      }else{
                        wx.reLaunch({
                          url: '../home/home',
                        })

                      }
                      
                    } else {
                      util.tips(data.data.code + data.data.msg, () => { })
                    }
                  } else {
                    util.tips(data.data.msg, () => { })
                  }

                }

              })
            }

          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  
})