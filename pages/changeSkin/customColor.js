var util = require('../../utils/util.js');
Page({
  data: {
    bgColor: "#323639",
    currentItem: "block",
    arrs: [{ 'class': 'block', 'bg': '#323639' }, { 'class': 'block1', 'bg': '#f53f3b' }, { 'class': 'block2', 'bg': '#ff7449' }, { 'class': 'block3', 'bg': '#fe893c' }, { 'class': 'block4', 'bg': '#f9c319' }, { 'class': 'block5', 'bg': '#c4e22c' }, { 'class': 'block6', 'bg': '#69ca19' }, { 'class': 'block7', 'bg': '#1dc391' }, { 'class': 'block8', 'bg': '#389ee9' }, { 'class': 'block9', 'bg': '#5179f2' }, { 'class': 'block10', 'bg': '#7b66ff' }, { 'class': 'block11', 'bg': '#af71ee' }, { 'class12': 'block', 'bg': '#e472ee' }, { 'class13': 'block', 'bg': '#fe76ca' }, { 'class': 'block14', 'bg': '#ff5e8a' }, { 'class': 'block15', 'bg': '#e472ee' }, { 'class': 'block16', 'bg': '#fe76ca' }, { 'class': 'block17', 'bg': '#ff5e8a' }, { 'class': 'block18', 'bg': '#fe9ab4' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 修改标题
    util.setTitle('自选颜色')
    //修改
    if (wx.getStorageSync('current') == undefined || wx.getStorageSync('current') == null || wx.getStorageSync('current') == '') {
      that.setData({
        currentItem: '#323639'
      })
    } else {
      that.setData({
        currentItem: wx.getStorageSync('current')
      })
    }
  },
  // 点击色块
  clickBlock: function (e) {
    // id
    var a = (e.target.id).slice(0, (e.target.id).indexOf("-"));
    //color
    var b = (e.target.id).slice((e.target.id).indexOf("-") + 1);
    this.setData({
      currentItem: a,
      bgColor: b
    })
  },
  // 点击使用
  usering: function () {
    var that=this;
    wx.setStorageSync('skinColor', that.data.bgColor);
    wx.setStorageSync('current', that.data.currentItem);
    // 返回前一页
    wx.navigateBack({
      delta: 1
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

  }

})