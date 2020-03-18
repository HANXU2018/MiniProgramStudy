// components/removeList/removeList.js
const db = wx.cloud.database();
const app = getApp()
const _ = db.command
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMessage: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelMessage() {
      let removeList = this;
      let mess = "是否删除" + this.data.userMessage.nickName + "的好友请求";
      
      wx.showModal({
        title: '删除好友请求',
        cancelColor: 'cancelColor',
        content: mess,
        confirmText: '删除',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            removeList.removeMessage();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleAddFriend() {
      let mess = "是否通用" + this.data.userMessage.nickName + "的好友请求";
      let removeList = this;
      wx.showModal({
        title: '接收好友请求',
        cancelColor: 'cancelColor',
        content: mess,
        confirmText: '同意',
        success(res) {
          if (res.confirm) {
            db.collection('users').doc(app.userInfo[0]._id).update({
              data:{
                friendList:_.unshift(removeList.data.messageId)
              }
            });
            wx.cloud.callFunction({
              name:'update',
              data:{
                collection:'users',
                doc:removeList.data.messageId,
                data:`{friendList:_.unshift('${app.userInfo[0]._id}')}`
              }
            });
            removeList.removeMessage();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    removeMessage(){
      let messageId = this.data.messageId;
      let removeList = this;
      db.collection('message').where({
        userId: app.userInfo[0]._id
      }).get().then((res) => {
        let list = res.data[0].list;
        list = list.filter((val, i) => {
          return val != messageId;
        })
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collection: 'message',
            where: {
              userId: app.userInfo[0]._id
            },
            data: {
              list
            }
          }
        }).then((res) => {
          removeList.triggerEvent('myevent', list);
        })
      });
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      db.collection('users').doc(this.data.messageId)
        .field({
          userPhoto: true,
          nickName: true,
          signature: true
        })
        .get().then((res) => {
          this.setData({
            userMessage: res.data
          });
        })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  removeMessage() {
    db.collection('message').where({
      userId: app.userInfo._id
    }).get().then((res) => {
      let list = res.data[0].list;
      list = list.filter((val, i) => {
        return val != this.data.messageId
      });
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'message',
          where: {
            userId: app.userInfo._id
          },
          data: {
            list
          }
        }
      }).then((res) => {
        this.triggerEvent('myevent', list);
      });
    });
  }
})