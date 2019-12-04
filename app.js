//app.js
import myWeChat from './utils/myWeChat.js'

App({
 
  onLaunch: function () {
    const app = getApp();
    //展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var sessionId = wx.getStorageSync("sessionId")
    if (sessionId) {
      console.log("sessionId在")
      wx.checkSession({
        success: function () {
          console.log("session有效，验证sessionId")
          var p = app.myWeChat.getdemoUserInfo();
          p.then(function (res) {
            if (res.header.statusCode == 0) {
              console.log("sessionId认证成功")
              app.globalData.demoUserInfo = res.body
            }
          });
        }
      })
    } else {
      console.log("sessionId不在，重新登录")
      this.login()
    }

  },
  login: function () {
    // 检查是否已授权，已授权做登陆操作，未授权跳转授权页面
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              getApp().globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
          wx.login({
            //获取用户code,用户本系统登陆
            success: res => {
              console.log("微信登录成功，code为： " + res.code);
              var p = that.myWeChat.demoLogin(res.code);
              p.then(function (res) {
                console.log(res);
                wx.setStorageSync("sessionId", res.body.sessionId)
                getApp().globalData.demoUserInfo = res.body
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/welcome/welcome',
          })
          return;
        }
      }
    })
    const that = this;
   

  
  
  },
  globalData: {
    userInfo: null,
    openid: null,
    demoUserInfo: null,
  },
  myWeChat: new myWeChat()
})