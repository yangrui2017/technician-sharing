<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "App",
  created() {
var openid = localStorage.getItem("openids");
var onoff=true;
      if (openid == " " || openid == null ) {
      var _that = this;
      var urls = window.location.href.split("?").toString();
      var code = _that.getQueryString("code");
      if (code !== "" && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api+"/wx/worker/userinfo_by_code?code=" + code)
          .then(function(response) {
             localStorage.setItem("openids",response.data.openid);
              localStorage.setItem("userinfo",JSON.stringify(response.data));
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //					获取code
         let formDatas = new FormData();
        formDatas.append( "r_url",urls);
        _that.$http.post(_that.$api+"/wx/worker/wx_js_sign", formDatas)
      
          .then(function(response) {
            urls=encodeURIComponent(urls);
            let link ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              response.data.appId +
              "&redirect_uri=" +
              urls +
              "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
             window.location.replace(link);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  mounted() {
   
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
