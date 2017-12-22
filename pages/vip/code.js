// pages/vip/code.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verify:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 修改标题
    util.setTitle('激活码兑换');
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
  // 点击完成
  finish(){
    var that=this;
    if (that.data.verify===""){
      util.tips("激活码不能为空",()=>{})
    }else{
      //发送请求
      wx.request({
        url: util.address + '/index.php/api/user/upvip',
        data: {
          'code': that.data.verify,
          "skey": wx.getStorageSync("skey")
        },
        method: 'POST',
        header: { 'content-Type': 'application/json' },
        success: function (res) {
          console.log(res)
          if (res.data.status == 'ok') {
            util.tips(res.data.msg, () => {
              wx.navigateTo({
                url: './vip',
              })
             })
          }else{
            util.tips(res.data.msg, () => { })
          }
        }
      })
    }
  }
})