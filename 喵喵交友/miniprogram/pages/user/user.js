// miniprogram/pages/user/user.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "https://love.hanxu51.cn/wp-content/uploads/2020/03/6fb80048b8aafd27d5651596a27e73478119bfc7.jpg",
    nickName: "app.userInfo.nickName",
    signature:"",
    logged: false,
    disabled: true,
    isLocation:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: "login",
      data: {}
    }).then((res) => {
      //console.log(res);
      db.collection('users').where({
          _openid: res.result.openid
        })
        .get()
        .then((res) => {
          if (res.data.length) {
            app.userInfo = Object.assign(app.userInfo, res.data)
            //console.log(app.userInfo)
            this.setData({
              userPhoto: app.userInfo[0].userPhoto,
              nickName: app.userInfo[0].nickName,
              logged: true,
              isLocation : app.userInfo[0].isLocation,
              signature:app.userInfo[0].signature
            });
            this.getMessage();
          }else{
            this.setData({
              disabled:false
            });
          }
        });
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.logged){
      this.setData({
        nickName:app.userInfo[0].nickName,
        userPhoto:app.userInfo[0].userPhoto,
        isLocation:app.userInfo[0].isLocation,
        signature:app.userInfo[0].signature
      })
      console.log("更新昵称为"+app.userInfo[0].nickName);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    let userInfo = e.detail.userInfo;
    if (!this.data.logged && userInfo) {
      this.logged = true;
      db.collection("users").add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          signature: '',
          phoneNumber: '',
          weixinNumber: '',
          isLocation:true,
          links: 0,
          time: new Date()
        }
      }).then((res) => {
        db.collection('users').doc(res._id).get().then((res) => {
          //console.log(res.data);
          app.userInfo = Object.assign(app.userInfo, res.data)
          console.log(app.userInfo)
          console.log("全局参数+"+app.userInfo)
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            isLocation:app.userInfo.isLocation,
            signature:app.userInfo.signature,
            logged: true
          })
          this.getMessage();
        })
      })
    }
    //this.userPhoto=e.detail.userInfo.avatarUrl;
    //console.log(this.userPhoto);
    wx.cloud.callFunction({
      name: "login",
      data: {}
    }).then((res) => {
      //console.log(res);
      db.collection('users').where({
          _openid: res.result.openid
        })
        .get()
        .then((res) => {
          if (res.data.length) {
            app.userInfo = Object.assign(app.userInfo, res.data)
            //console.log(app.userInfo)
            this.setData({
              userPhoto: app.userInfo[0].userPhoto,
              nickName: app.userInfo[0].nickName,
              logged: true,
              isLocation : app.userInfo[0].isLocation,
              signature:app.userInfo[0].signature
            });
          }else{
            this.setData({
              disabled:false
            });
          }
        });
    });









  },
  getMessage(){
    
  }
})