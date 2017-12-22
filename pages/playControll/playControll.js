//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      
    }
    return {
      title: this.obj.title + "-" + this.obj.sing,
      path: '/page/playControll/playControll?id=' + this.obj.id,
      success: function (res) {
        util.tips('转发成功', function () { })
      },
      fail: function (res) {
        util.tips('转发失败', function () { })
      }
    }
  },
  // 页面记载完毕
  onReady: function () {
    if (wx.getStorageSync('songlists') == "") {
      this.netWorkState()
    }else{
      this.player = wx.createAudioContext('player')
      // 自动播放
      this.player.play()
    }
    
  },
  data: {
    obj: '',
    address: util.address,
    objText: '暂无歌词',
    textShow: true,
    player: {},
    endTime: "00:00",
    startTime: '00:00',
    totalPosition: "",
    currentPosition: 0,
    isPlay: true,
    isCollect: false
  },
  // 封装网络状态
  netWorkState() {
    let that = this;
    // 测试只在wifi状态下播放
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType == 'wifi') {
          // 使用 wx.createAudioContext 获取 audio 上下文 context
          that.player = wx.createAudioContext('player')
          // 自动播放
          that.player.play()
          that.setData({
            isPlay: true
          })
        } else if (networkType == '2g' || networkType == '3g' || networkType == '4g') {
          if (wx.getStorageSync('netPlay')) {
            // 使用 wx.createAudioContext 获取 audio 上下文 context
            that.player = wx.createAudioContext('player')
            // 自动播放
            that.player.play()
            that.setData({
              isPlay: true
            })
          } else {
            that.setData({
              isPlay: false
            })
            util.tips('当前在2G/3G/4G网络状态下,前往设置', () => {
              wx.navigateTo({
                url: '../set/set',
              })
            })
          }
        } else if (networkType == 'unknown') {
          that.setData({
            isPlay: false
          })
          util.tip('当前在unknown网络状态下,切换网络状态在播放', () => {
            wx.navigateBack({
              delta: 1
            })
          })
        } else if (networkType == 'none') {
          that.setData({
            isPlay: false
          })
          util.tips('当前无网络，请切换至wifi状态播放', () => {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
  },
  // 封装刚进来的加载的方法
  comingLoading(res, cover_url, audio_url){
    let that = this;
    // 最近播放
    var arr=[];
    if (wx.getStorageSync('recentPlay') == "") {
      arr.push(res);
      wx.setStorageSync('recentPlay', arr)
    } else {
      arr = wx.getStorageSync('recentPlay');
      arr.push(res)
      wx.setStorageSync('recentPlay', arr)
    }
    // 獲取音频内部上下文
    that.setData({
      obj: res,
      player: {
        poster: cover_url,
        name: res.title,
        author: res.sing,
        src: audio_url
      }
    })
    // 修改标题
    util.setTitle(res.title)
    // 歌词处理
    if (res.lrc_text == "") {
      that.setData({
        objText: "暂无歌词",
        textShow: true
      })
    } else {
      that.setData({
        objText: res.lrc_text.split(/，|。|！| |\n/),
        textShow: false
      })
    }
    // 是否收藏
    if (res.isfav == 0) {
      that.setData({
        isCollect: false
      })
    } else {
      that.setData({
        isCollect: true
      })
    }
  },
  // 页面加载前
  onLoad: function (options) {
    let that = this;
    if (options.index == undefined || options.index == null){
      util.songDetail(util.address + '/index.php/api/song-detail/' + options.id, (res) => {
        that.comingLoading(res.data.data, res.data.data.cover_url, that.data.address + res.data.data.audio_url);
      })
    }else{
      that.comingLoading(wx.getStorageSync("download")[options.index],"" , wx.getStorageSync('songlists')[options.index]);
    }
    
    //开启页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // 视频播放变化的时候
  timeupdate(e) {
    let that = this;
    that.setData({
      endTime: util.formatMinute(e.detail.duration),
      totalPosition: e.detail.duration,
      startTime: util.formatMinute(e.detail.currentTime),
      currentPosition: e.detail.currentTime
    })
  },
  //开始播放
  controlPlay: function () {
    this.netWorkState();
  },
  //暂停播放
  controlPause: function () {
    this.player.pause()
    this.setData({
      isPlay: false
    })
  },
  //收藏接口
  collect: function (options) {
    let that = this;
    util.collection(options.currentTarget.id, function (res) {
      if (res.remove) {
        that.setData({
          isCollect: true
        })
      } else {
        that.setData({
          isCollect: false
        })
      }
    })
  },
  // 保存数据
  datas(options){
    wx.downloadFile({
      url: util.address + '/index.php/api/song-detail/' + options.target.dataset.id,  //图片的下载地址
      // url: util.address +options.target.dataset.src,
      success: function (res) { //图片下载成功
        wx.saveFile({
          tempFilePath: res.tempFilePath, //下载后的图片临时地址
          success: function (res) {
            util.songDetail(res.savedFilePath, (res) => {
              var arr = [];
              if (wx.getStorageSync('download') == "") {
                arr.push(res.data.data);
                wx.setStorageSync('download', arr)
              } else {
                arr = wx.getStorageSync('download');
                arr.push(res.data.data)
                wx.setStorageSync('download', arr)
              }
            })
          },
          fail: function () {
            console.log("保存失败")
          }
        })
      }, fail: function (res) {
        console.log("下载失败")
      }
    })
  },
  // 下载
  download(options) {
    var that=this;
    //图片下载成功
    wx.downloadFile({
      url: util.address + options.target.dataset.src,
      success: function (res) { 
        wx.saveFile({
          tempFilePath: res.tempFilePath, //下载后的图片临时地址
          success: function (res) {
            console.log(res.savedFilePath)
            
            var arr2 = [];
            if (wx.getStorageSync('songlists') == "") {
              arr2.push(res.savedFilePath);
              wx.setStorageSync('songlists', arr2)
            } else {
              arr2 = wx.getStorageSync('songlists');
              arr2.push(res.savedFilePath)
              wx.setStorageSync('songlists', arr2)
            }
            util.tips('保存成功',()=>{
              that.datas(options)
            })
            
          },
          fail: function () {
            console.log("保存失败")
          }
        })
      }
    })

  }
})
