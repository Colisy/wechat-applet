// var address = 'https://www.feizhugu.com'
var address = 'http://192.168.88.123'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//收藏的接口
function collection(id, callback) {
  wx.request({
    url: address + '/index.php/api/fav',
    data: {
      "type": "songs",
      "id": id
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.data.status == 'ok') {
        // 没确定
        callback(res.data.data);
      } else {
        tips(res.data.msg, () => { })
      }
    }
  })
}
// 收藏列表
const collectLists = (page, callback) => {
  wx.request({
    url: address + '/index.php/api/zone/myfav',
    data: {
      "page": page,
      "type": 'song',
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.data.status == 'ok') {
        callback(res.data.data);
      }
    }
  })
}
// 带有title的提示语句
const titleTips = (title, content, callback) => {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmColor: "#ff5045",
    success: function (res) {
      callback(res)
    }
  })
}
// 时长 02:57
function formatMinute(s) {
  let m = parseInt(s / 60);
  s = parseInt(s % 60);
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  if (s.toString().length == 1) {
    s = "0" + s;
  }
  return m + ":" + s;
}
//时长-->毫秒
function ms(str) {
  var a = str.substr(0, 2);
  var b = str.substr(3, 2);
  return Number(a) * 60 + Number(b);
}
// 提示语句 --> 模态框
function tips(tips, callback) {
  wx.showModal({
    content: tips,
    showCancel: false,
    confirmColor: "#ff5045",
    success: function () {
      callback()
    }
  })
}
// 带有取消的提示语句
const noneTips = (tips, callback) => {
  wx.showModal({
    content: tips,
    cancelText: '暂不',
    confirmText: '继续',
    showCancel: true,
    confirmColor: "#ff5045",
    success: function (res) {
      callback(res)
    }
  })
}
//手机号正则表达式
var phone = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
//登录接口
function wxLogin(username, password, callback) {
  wx.request({
    url: address + '/index.php/api/user/login',
    data: {
      "username": username,
      "password": password,
      "skey": wx.getStorageSync("skey"),
      "autologin": 'on'
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      callback(res);
    }
  })
}
// songs
function getListsItems(pageSize, callback) {
  wx.request({
    url: address + '/index.php/api/song/2/' + pageSize,
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.data.status == 'ok') {
        callback(res.data.data);
      }
    }
  })
}
//搜索结果
function selectResult(selectContent, pageSize, callback) {
  wx.request({
    url: address + "/index.php/api/m-search/" + selectContent + '/' + pageSize,
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (data) {
      if (data.data.status == 'ok') {
        callback(data.data.data);
      }
    }
  })
}
// 用户基本信息
function baseInfomation(callback) {
  wx.request({
    url: address + '/index.php/api/user/index',
    data: {
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      console.log(res)
      callback(res.data);
    }
  })
}
// 发送短信验证码
function sendCode(phone, callback) {
  wx.request({
    url: address + '/index.php/api/sms',
    data: {
      'phone': phone,
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      callback(res.data);
    }
  })
}
//倒计时
function countDown(count, callback) {
  setInterval(function () {
    if (count > 1) {
      count -= 1
    } else {
      count = 0;
    }
    return callback(count);
  }, 1000)
}
// 微信绑定
function wxBind(username, password, auth, callback) {
  wx.request({
    url: address + '/index.php/api/user/wx_bind',
    data: {
      "username": username,
      "password": password,
      "autologin": 'on',
      auth: auth,
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      console.log(res)
      if (res.data.status == 'ok') {
        callback(res);
      } else {
        tips("绑定失败", () => { })
      }
    }
  })
}
//注册
function regist(username, password, verify, auth, callback) {
  wx.request({
    url: address + '/index.php/api/user/reg',
    data: {
      'phone': username,
      'verify': verify,
      'pwd': password,
      'repwd': password,
      'agree': "true",
      "skey": wx.getStorageSync("skey"),
      "auth": auth
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (data) {
      callback(data.data);
    }
  })
}
//退出登录
function logOut(callback) {
  wx.request({
    url: address + '/index.php/api/user/logout',
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      callback(res.data);
    }
  })
}
//调用拍照、相册功能
function picture(add, callback) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;//所选择图片的列表
      wx.uploadFile({
        url: address + add,
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          var data = JSON.parse(res.data).data
          callback(tempFilePaths, data);
          //do something
        }
      })
    }
  })
}
//上传视频
function video(add, callback) {
  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    compressed: true,
    maxDuration: 60,
    camera: 'back',
    success: function (res) {
      var res = res;
      wx.uploadFile({
        url: address + add,
        filePath: res.tempFilePath,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (data) {
          var data = JSON.parse(data.data).data
          callback(res, data);
        }
      })
    }
  })
}
//歌曲详情接口
const songDetail = (url, callback) => {
  wx.request({
    url: url,
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      callback(res)
    }
  })
}
// 发送获取微信支付信息的接口
function wxPay(total, typeid, num,callback) {
  wx.request({
    url: address + '/index.php/api/wxapp/payment',
    data: {
      "total": total,
      "type": typeid,
      "num": num,
      "uid":wx.getStorageSync('uid'),
      "openid": wx.getStorageSync("openid"),
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {  
      if (res.data.status == 'error') {
        tips(res.data.msg, () => { })
      }else{
        var _data = JSON.parse(res.data);
        // 微信支付
        wx.requestPayment({
          'timeStamp': _data.timestamp,
          'nonceStr': _data.nonceStr,
          'package': _data.package,
          'signType': _data.signType,
          'paySign': _data.paySign,
          'success': function (res) {
            callback(res)
          },
          'fail': function (res) {
            console.log(";错误")
            console.log(res)
          }
        })

      }
    }
  })
}
// 设置当前页面标题
function setTitle(title) {
  wx.setNavigationBarTitle({
    title: title
  })
}
// 意见反馈
const feedback = (content, callback) => {
  wx.request({
    url: address + '/index.php/api/pub/sug',
    data: {
      'content': content,
      "skey": wx.getStorageSync("skey")
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.data.status == 'ok') {
        callback(res.data);
      }
    }
  })
}
//导出
module.exports = {
  formatTime: formatTime,
  formatMinute: formatMinute,//时长
  ms: ms, //毫秒数
  collection: collection, //收藏
  address: address, //地址
  tips: tips,  //提示语句
  phone: phone,  //手机号验证
  wxLogin: wxLogin, //登录
  getListsItems: getListsItems,//首页歌曲列表
  selectResult: selectResult, //搜索结果列表
  baseInfomation: baseInfomation,//用户信息
  sendCode: sendCode,//发短信
  countDown: countDown,//倒计时
  regist: regist,//注册
  logOut: logOut,//退出登录
  picture: picture,//拍照、相册
  setTitle: setTitle,//标题
  video: video,//视频
  titleTips: titleTips,//带有标题的提示框
  feedback: feedback,//意见反馈
  noneTips: noneTips,//带有取消的提示框
  collectLists: collectLists,//收藏列表
  songDetail: songDetail,//歌曲详情
  wxBind: wxBind,//微信绑定
  wxPay: wxPay,//微信支付
}
