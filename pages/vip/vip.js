// pages/vip/vip.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVip: false,
    isMouth: false,
    lists: "",
    headmouth:"",
    headlastmouth:"",
    inputVal:1,
    dataTime: wx.getStorageSync('viptime').slice(0, 10)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 修改标题
    util.setTitle('VIP')
    // vip 开通月份列表
    util.songDetail(util.address + '/index.php/api/vipconf', (res) => {
      if (res.data.status == 'ok') {
        that.setData({
          lists: res.data.data,
          headmouth: res.data.data[0].cost,
          headlastmouth: res.data.data[0].orig
        })
      }
    })
    // isvIP
    if (wx.getStorageSync('isVip') == '2') {
      // 是vip
      that.setData({
        isVip: true
      })
    } else if (wx.getStorageSync('isVip') == '1') {
      // 不是vip
      that.setData({
        isVip: false
      })
    }
  },
  // 开通Vip
  opening() {
    this.setData({
      isMouth: true
    })
  },
  // 点击遮罩层
  clearDark() {
    this.setData({
      isMouth: false
    })
  },
  // 点击立即开通
  immeVip(e) {
    // 发送获取微信支付信息的接口e.currentTarget.dataset.money
    util.wxPay("0.01", e.currentTarget.dataset.id, e.currentTarget.dataset.mouth, (res) => {
      this.setData({
        isMouth: false,
        isVip:false
      })
      setTimeout(() => {
        util.titleTips('支付成功', '', function (res) {
          wx.reLaunch({
            url:"../personCenter/personCenter"
          })
        })
      }, 30)
    })
  },
  // 激活码兑换页面
  gotocode() {
    wx.navigateTo({
      url: './code',
    })
  },
  // 点击月数增加
  numadd(){
    this.setData({
      inputVal: this.data.inputVal+1,
      headmouth: (this.data.inputVal + 1) * this.data.headmouth,
      headlastmouth: (this.data.inputVal + 1) * this.data.headlastmouth
    })
  },
  // 点击月数减少
  numredu(){
    if (this.data.inputVal>1){
      this.setData({
        inputVal: this.data.inputVal - 1,
        headmouth: this.data.headmouth / this.data.inputVal,
        headlastmouth: this.data.headlastmouth / this.data.inputVal
      })
    }
  }

})