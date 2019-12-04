// pages/message/message.js
const app = getApp(); 
Page({


  /**
   * 页面的初始数据
   */
  data: {
    currentNavbar: '0',
    navbar: ['好玩的事', '我参与的', '我发起的'],
  },

  getDemoUserInfo: function () {
    wx.switchTab({
      url: 'pages/mine/mine'
    })
  }

 
})