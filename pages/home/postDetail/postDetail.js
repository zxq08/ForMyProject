// pages/home/postDetail/postDetail.js
var postData = require("../../../data/postData.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "collection":"../../../images/icon/collection-anti.png",
    "share": "../../../images/icon/share.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var Postid = options.id;
    this.data.currentID = Postid;
    var postList = postData.postList;
    for (var i = 0; i < postList.length;i++){
      if (postList[i].post_id == Postid){
          this.setData({
            detailList: postList[i]
          });  
      }
    }
  //collection设置初始收藏状态
    //从缓存获取所有文章收藏状态
    var postCollection = wx.getStorageSync("postCollection");
    if (postCollection){
      //获取当前文章的收藏状态
      var postCollected = postCollection[Postid];
      //设置当前文章的收藏状态
      this.setData({
        collected: postCollection,
        collection: postCollected ? "../../../images/icon/collection.png":"../../../images/icon/collection-anti.png"
      })
    }
    else{
      //如果没有缓存，初始化当前文章收藏状态为false
      var postCollection = {};
      postCollection[Postid] = false;
      wx.setStorageSync("postCollection", postCollection);
    }
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
  collected: function(event){
    var currentID = this.data.currentID;
    var storageColl = wx.getStorageSync("postCollection");
    var currentColl = storageColl[currentID];
    currentColl = !currentColl;
    storageColl[currentID] = currentColl;
    wx.setStorageSync("postCollection", storageColl);
    this.setData({
      collected: currentColl,
      collection: currentColl ? "../../../images/icon/collection.png" : "../../../images/icon/collection-anti.png"
    })
    wx.showToast({
      title: currentColl ? "收藏成功" : "取消收藏",
      icon: "success",
      duration: 1000
    })
  },
  shared : function(event){
    wx.showActionSheet({
      itemList: ['微信朋友','朋友圈','QQ好友','QQ空间'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})