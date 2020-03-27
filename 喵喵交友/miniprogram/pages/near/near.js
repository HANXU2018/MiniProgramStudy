// miniprogram/pages/near/near.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_stories:[],
    markers: [{
      iconPath: "https://6465-dev-ghost0-1300638227.tcb.qcloud.la/example.png?sign=afc7555b90dc4a46e9e93865084290b7&t=1584683573",
      id: 0,
      latitude: 38.88167,
      longitude: 115.5660,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude:38.88167,
        latitude: 115.5660
      }, {
        longitude: 38.88167,
        latitude: 115.5660
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: 'https://6465-dev-ghost0-1300638227.tcb.qcloud.la/example.png?sign=afc7555b90dc4a46e9e93865084290b7&t=1584683573',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      wx.request({
        url: 'https://news-at.zhihu.com/api/4/news/latest', //知乎日报最新话题
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log('网络请求成功之后获取到的数据',res)
          console.log('知乎日报最新话题',res.data)
          that.setData({
            top_stories:res.data.top_stories
          })
          console.log(that.data.top_stories);
        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getLocation(){
   
  }
})
