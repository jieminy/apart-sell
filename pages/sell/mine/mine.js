//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    this.remind();
  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo){
      this.remind();
      return;
    }
    //获取用户信息
    app.getUserInfo();
    wx.switchTab({
      url: '../index',
    })
  },
  remind: function(){
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"] === false) {
          wx.showModal({
            title: '用户信息未授权',
            content: '如需正常使用小程序，需先授权获取用户信息，请点击 获取头像昵称',
            showCancel: false
          })
        }
      }
    })
  },
  openOrderPage: function(){
    wx.navigateTo({
      url: 'myorder/myorder'
    });
  },
  openAddressPage: function(){
    wx.navigateTo({
      url: 'address/address'
    });
  },
  openCustomPage: function(){
    wx.navigateTo({
      url: 'custom/custom'
    });
  }
})