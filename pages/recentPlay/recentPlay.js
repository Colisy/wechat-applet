// pages/recentPlay/recentPlay.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: '',
    currentPage: 0,
    totalPage: 1,
    address: util.address,
    // isMouth:true
    startX: "",
    isLists: true,
    noResult: '',
    title: '我的下载'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 不同页面设置不同的title
    if (options.back == 'download') {
      that.setData({
        title: '我的下载'
      })
      // download
      if (wx.getStorageSync('download') != "") {
        var darr = wx.getStorageSync('download');
        var hash = {};
        darr = darr.reduce(function (item, next) {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next);
          return item
        }, [])
        that.setData({
          lists: darr,
          isLists: true
        });
      } else {
        that.setData({
          noResult: '您最近还没有下载过任何歌曲哦~',
          isLists: false
        })
      }
    } else if (options.back == 'collect') {
      that.setData({
        title: '我的收藏'
      })
      util.collectLists(that.data.currentPage + 1, function (data) {
        console.log(data)
        if (data.list.length != 0) {
          that.setData({
            lists: data.list,
            currentPage: data.curPage,
            totalPage: data.totalPage,
            isLists: true
          });
        } else {
          that.setData({
            isLists: false,
            noResult: '您最近还没有收藏过歌曲哦~'
          });
        }
      })
    } else if (options.back == 'recentPlay') {
      that.setData({
        title: '最近播放'
      })
      // 最近播放列表
      if (wx.getStorageSync('recentPlay') != "") {
        var arr = wx.getStorageSync('recentPlay');
        var hash = {};
        arr = arr.reduce(function (item, next) {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next);
          return item
        }, [])
        that.setData({
          lists: arr,
          isLists: true
        });
      } else {
        that.setData({
          noResult: '您最近还没有播放过任何歌曲哦~',
          isLists: false
        })
      }
    }
    util.setTitle(that.data.title);

  },
  // loadmore
  lower: function () {
    var thss = this;
    // if (thss.data.currentPage < thss.data.totalPage) {
    //   util.getListsItems(Number(thss.data.currentPage) + 1, function (data) {
    //     thss.setData({
    //       lists: thss.data.lists.concat(data.list),
    //       currentPage: data.curPage,
    //       totalPage: data.totalPage
    //     });
    //   })
    // }
  },
  // 进入歌曲播放页面
  gotoPlayControlle: function (e) {
    if (this.data.title == "我的下载") {
      wx.navigateTo({
        url: '../playControll/playControll?index=' + e.currentTarget.dataset.index
      })
    } else {
      wx.navigateTo({
        url: '../playControll/playControll?id=' + e.currentTarget.dataset.id
      })
    }

  },
  //手指刚放到屏幕触发
  touchStart: function (e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchMove: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = '140';
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.lists;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        lists: list
      });
    }
  },
  // 觸摸結束
  touchEnd: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = '140';
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:-" + 0 + "rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.lists;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        lists: list
      });
    }
  },
  // 删除列表
  delectItem(options) {
    // 最近播放
    let that = this;
    if (that.data.title == '最近播放') {
      var arrays = that.data.lists;
      for(var i=0;i<arrays.length;i++){
        if (arrays[i].id == options.currentTarget.dataset.id){
            arrays.splice(i,1)
        }
        wx.setStorageSync('recentPlay', arrays)
        that.setData({
          lists: arrays,
          isLists: true
        });
      }
    } else if (that.data.title == '我的下载'){
      var darrays = that.data.lists;
      for (var i = 0; i < darrays.length; i++) {
        if (darrays[i].id == options.currentTarget.dataset.id) {
          darrays.splice(i, 1)
        }
        wx.setStorageSync('download', darrays)
        that.setData({
          lists: darrays,
          isLists: true
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})