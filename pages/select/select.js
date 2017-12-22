var util = require('../../utils/util.js');

Page({
  data: {
    address: util.address,
    isShowResult: false,
    songResultLists: '',
    selectCurrentPage: 0,
    selectTotalPage: 1,
    hasResult: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    util.setTitle('搜索')
  },
  // selectBar
  showInput: function () {
    this.setData({
      inputShowed: true,
      isShowResult: true,
      hasResult: true,
      songResultLists: ''
    });
  },
  // 隐藏input
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      isShowResult: false,
      hasResult: true
    });
  },
  //清空input的value
  clearInput: function () {
    this.setData({
      isShowResult: true,
      songResultLists: '',
    });
  },
  // 进入歌曲播放页面
  gotoPlayControlle: function (e) {
    wx.navigateTo({
      url: '../playControll/playControll?id=' + e.currentTarget.id
    })
  },
  //点击input
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      hasResult: true
    });
  },
  //分离出来的搜索的方法
  outerSelect: function (inputVal, page) {
    var that = this;
    util.selectResult(inputVal, page, function (data) {
      if ( data.songs.list == 0) {
        that.setData({
          hasResult: false
        })
      } else {
        that.setData({
          songResultLists: data.songs.list,
          selectCurrentPage: data.songs.curPage,
          selectTotalPage: data.songs.totalPage,
          hasResult: true
        })
      }
    })
  },
  //加载更多
  mvLower: function () {
    var thss = this;
    if (thss.data.selectCurrentPage < thss.data.selectTotalPage) {
      util.selectResult(this.data.inputVal, Number(thss.data.selectCurrentPage) + 1, function (data) {
        thss.setData({
          songResultLists: thss.data.songResultLists.concat(data.songs.list),
          selectCurrentPage: data.songs.curPage,
          totalPage: data.songs.totalPage
        });
      })
    }
  },
  //搜索结果
  selectResult: function (e) {
    this.outerSelect(this.data.inputVal, Number(this.data.selectCurrentPage) + 1)
  },
  //分离出来热门搜索的方法
  hotSelect: function (name) {
    this.outerSelect(name, Number(this.data.selectCurrentPage) + 1)
    this.setData({
      isShowResult: true,
      inputVal: name,
      inputShowed: true
    })
  },
  // 热门搜索--支爽
  selectshuang: function () {
    this.hotSelect('支爽');
  },
  //热门搜索--莉娅
  selectya: function () {
    this.hotSelect('莉娅');
  },
  // 热门搜索飞猪侠
  selectzhu(){
    this.hotSelect('飞猪侠');
  }
});
