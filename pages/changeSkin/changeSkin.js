// pages/changeSkin/changeSkin.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItem: "skin-item-red",
    arr: [{ 'class': "skin-item-red", 'bgColor': '#ff5045', 'text': '官方红' }, { 'class': 'skin-item-white', 'bgColor': '#ffaf06', 'text': '官方黄' }, { 'class': 'skin-item-user', 'bgColor': '123', 'text': '自选颜色' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 修改标题
    util.setTitle('个性换肤')
    //修改
    if (wx.getStorageSync('currentItem') == undefined || wx.getStorageSync('currentItem') == null || wx.getStorageSync('currentItem') == ''){
      that.setData({
        currentItem:'skin-item-red'
      })
    }else{
      that.setData({
        currentItem: wx.getStorageSync('currentItem')
      })
    }
  },
  //点击选择
  skinSelect:function(e){
    var that=this;
    // id
    var a = (e.target.id).slice(0, (e.target.id).indexOf("="));
    //color
    var b = (e.target.id).slice((e.target.id).indexOf("=") + 1);
    if(b=='123'){
      wx.setStorageSync("currentItem", 'skin-item-user')
      wx.navigateTo({
        url: './customColor',
      })
    }else{
      that.setData({
        currentItem: a
      })
      wx.setStorageSync("currentItem", a)
      wx.setStorageSync('skinColor', b);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }

})
