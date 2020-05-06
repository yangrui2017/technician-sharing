<template>
  <div class="box">
    <div class="content">
      <div class="header">
        <img class="logo"
             src="../assets/logo.png" />
        <div class="name">E帮洗车</div>
      </div>
      <div class="text">
        <p>尊敬的{{nickname}}:</p>
        <span>欢迎您注册E帮洗车公众号</span>
      </div>
      <div class="button"> 详情请点击<router-link to="/technicians">E帮合伙人招募令</router-link>
      </div>

      <div style="clear:both"></div>
    </div>
    <div class="footer">
      上海联产电子科技有限公司
    </div>

  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname: ''

    }
  },
  created () {
    var openid = localStorage.getItem('openids')
    var onoff = true
    if (openid == 'undefined' || openid == null) {
      var _that = this
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('openids', response.data.openid)
            localStorage.setItem('userinfo', JSON.stringify(response.data))
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        //					获取code
        let formDatas = new FormData()
        formDatas.append('r_url', urls)
        _that.$http.post(_that.$api + '/wx/worker/wx_js_sign', formDatas)

          .then(function (response) {
            urls = encodeURIComponent(urls)
            let link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
              response.data.appId +
              '&redirect_uri=' +
              urls +
              '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
            window.location.replace(link)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  mounted () {
    var _that = this
    _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).nick
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url(../assets/member2.jpg) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.showdiv {
  width: 100%;
  height: 50px;
  background: #ebebeb;
}
.header {
  width: 100%;
  margin-top: 90px;
  float: left;
}
.logo {
  height: 24px;
  margin-top: 13px;
  margin-left: 2%;
  text-align: left;
}
.name {
  font-size: 18px;
  line-height: 30px;
  color: white;
}

.content {
  width: 80%;
  margin-left: 10%;
}
.text {
  float: left;
  width: 70%;
  margin-left: 15%;
  color: white;
}
.button {
  float: left;
  width: 70%;
  margin-left: 15%;
  color: white;
  font-size: 16px;
  line-height: 200px;
}
.button a {
  color: #0fda9d;
}
.text p {
  text-align: left;

  font-size: 16px;
}
.text span {
  font-size: 14px;
  line-height: 30px;
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 30px;
}
</style>
