// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      authFlag:false,
      userInfo: null
  },


  getAuthUserInfo() {
    const that = this;
    console.log("授权成功");
    const app = getApp();
    wx.getUserInfo({
      success: (res) => {
        console.log("授权成功");
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res);
        }
        that.setUserInfo(res)        
      },
      
    })
  },

  setUserInfo:function(res) {
    getApp().globalData.userInfo = res.userInfo;
    console.log(getApp().globalData.userInfo)
    wx.navigateBack({
      delta: 1
    })
  }
})