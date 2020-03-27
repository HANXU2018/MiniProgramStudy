// miniprogram/pages/friendList/friendList.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [''],
    friendList : []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad生命周期函数--监听页面加载");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady生命周期函数--监听页面初次渲染完成");
    db.collection('users').where({
      friendList : app.userInfo._id
    }).field({
      userPhoto : true,
      nickName : true,
      signature:true
    }).get().then((res)=>{
      console.log(res.data)
      this.setData({
        friendList: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow生命周期函数--监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide生命周期函数--监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload生命周期函数--监听页面卸载");
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
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
})