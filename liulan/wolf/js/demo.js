/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
 
	
wx.ready(function() {

  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
 // document.querySelector('#checkJsApi').onclick = function() {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
      success: function(res) {
        //alert(JSON.stringify(res));
      }
    });
  //};
  

  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  //document.querySelector('#onMenuShareAppMessage').onclick = function() {
	 // alert(555)
	 var myimgurl =  'http://wolf.rkastore.com/img/share.jpg?v1';
    wx.onMenuShareAppMessage({
      desc: '你知道吗？其实大家都是狼，只是我们自己不知道。我找到了属于我的狼性。你呢？',
      title: '每个人心中都有一匹狼',
      imgUrl: myimgurl,
      trigger: function(res) {
		  this.link = "http://wolf.rkastore.com/?whichId="+document.getElementById("whichId").value;
		 
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        //alert('用户点击发送给朋友');
      },
      success: function(res) {
		
       // alert('已分享');
      },
      cancel: function(res) {
        //alert('已取消');
      },
      fail: function(res) {
        //alert(JSON.stringify(res));
      }
    });
    //alert('已注册获取“发送给朋友”状态事件');
  //};

  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  //document.querySelector('#onMenuShareTimeline').onclick = function() {
    wx.onMenuShareTimeline({
      title: '每个人心中都有一匹狼',
      imgUrl: myimgurl,
      trigger: function(res) {
		 this.link = "http://wolf.rkastore.com/?whichId="+document.getElementById("whichId").value
      },
      success: function(res) {
		
		
       // alert('已分享');
      },
      cancel: function(res) {
       // alert('已取消');
      },
      fail: function(res) {
       // alert(JSON.stringify(res));
      }
    });
    //alert('已注册获取“分享到朋友圈”状态事件');
 // };

  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  //document.querySelector('#onMenuShareQQ').onclick = function() {
    wx.onMenuShareQQ({
      desc: '你知道吗？其实大家都是狼，只是我们自己不知道。我找到了属于我的狼性。你呢？',
      title: '每个人心中都有一匹狼！',
      imgUrl: myimgurl,
      trigger: function(res) {
		this.link = "http://wolf.rkastore.com/?whichId="+document.getElementById("whichId").value

      },
      complete: function(res) {
        //alert(JSON.stringify(res));
      },
      success: function(res) {
		
       // alert('已分享');
      },
      cancel: function(res) {
       // alert('已取消');
      },
      fail: function(res) {
        //alert(JSON.stringify(res));
      }
    });
    //alert('已注册获取“分享到 QQ”状态事件');
  //};

  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  //document.querySelector('#onMenuShareWeibo').onclick = function() {
    wx.onMenuShareWeibo({
      desc: '你知道吗？其实大家都是狼，只是我们自己不知道。我找到了属于我的狼性。你呢？',
      title: '每个人心中都有一匹狼！',
      imgUrl: myimgurl,
      trigger: function(res) {
		  this.link = "http://wolf.rkastore.com/?whichId="+document.getElementById("whichId").value
      },
      complete: function(res) {
        //alert(JSON.stringify(res));
      },
      success: function(res) {
		
       // alert('已分享');
      },
      cancel: function(res) {
       // alert('已取消');
      },
      fail: function(res) {
        //alert(JSON.stringify(res));
      }
    });
    //alert('已注册获取“分享到微博”状态事件');
  //};
  
  wx.error(function(res) {
     // alert(res.errMsg);
  });

});

