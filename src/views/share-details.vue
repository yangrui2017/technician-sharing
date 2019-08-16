<template>

  <div class="box">
    <h2>{{operable.name}}</h2>
    <p>{{operable.description}}</p>
    <img :src="qr_url" class="imgurl"/>
    <p>通过分享您可获得{{points}}</p>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      points:"",
      event_scene_str:"",
      qr_url: "",
      operable: {
      },
      share:{
        links:"http://wx.upctech.com.cn/share-page?key=",
        title:"你好我是E帮洗车",
        desc:"关注我们",
        imgUrl:"http://www.upctech.com.cn/static/picture/logo.png"
      }
    };
  },
  created() {
  },
  mounted() {
    var urls= window.location.href.split("?")[0];
    var _that = this;
    _that._data.operable = JSON.parse(sessionStorage.getItem("operable"));//获取菜单并显示
   
    //获取分享二维码
    _that.$http.post(_that.$api+"/wx/event/user_event/create/", {           
            "event_id":_that._data.operable.id,
            "openid": localStorage.getItem("openid")
    })
    .then(function(response) {
         _that._data.points=response.data.event_info.points+"积分";
      _that._data.event_scene_str=response.data.event_scene_str;
       _that._data.qr_url=response.data.event_qr.qr_url;
    })
    .catch(function(error) {
      console.log(error);
    });
    //获取微信分享sdkconfig
        let formData = new FormData();
      formData.append( "r_url",urls); // 'file' 可变 相当于 input 表单的name 属性
    _that.$http.post(_that.$api+"/wx/wx_js_sign", formData)
          .then(function(response) {
            if(JSON.stringify(response.data) =="{}"){
              alert("没有获取到jsdk")
            }else{
              _that._data.data1=JSON.stringify(response.data) ;
                  _that.wxInit(response.data);
          
          
            }
          })
  },
  methods: {
    //微信分享
    wxInit(res) {
      var _that = this;
      console.log(res)
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
      });
      // 微信分享失败
      wx.error(function(err) {
        alert(JSON.stringify(err));
      });
      wx.ready(function() {
        var datas=JSON.parse(JSON.stringify(_that._data));
        wx.onMenuShareTimeline({
          title: datas.share.title, // 分享标题
          desc:  datas.share.desc, // 分享描述
          link:  datas.share.links+datas.event_scene_str, // 分享链接
          imgUrl: datas.share.imgUrl, // 分享图标
          success: function() {
                          alert("分享到朋友圈成功")
          },
          cancel: function() {
                          alert("分享失败,您取消了分享!")
          }
        });
        //微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: datas.share.title, // 分享标题
          desc:  datas.share.desc, // 分享描述
          link:  datas.share.links+ datas.event_scene_str, // 分享链接
          imgUrl: datas.share.imgUrl, // 分享图标
          success: function() {
            alert("成功分享给朋友")
          },
          cancel: function() {
            alert("分享失败,您取消了分享!")
          }
        });
      });
      
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
        height: 100%;
   background: url(../assets/fuwu.png); 
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

h2 {
  text-align: center;
}

p {
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
}
.imgurl{
  width:50%;
}
</style>
