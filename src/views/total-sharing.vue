<template>
  <div class="box">
    <header>
      <img :src="headerimg"
           class="headerimg" />
      <div class="header">{{nickname}}</div>
    </header>
    <div class="container">
      <div class="van-cell-group__title">技师专享</div>
      <div class="van-cell-group van-hairline--top-bottom">
        <router-link to="/activity-list">
          <div class="van-cell van-cell--clickable van-cell--large">
            <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
            <div class="van-cell__title"><span>推广活动</span></div>
            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
          </div>
        </router-link>
      </div>
      <div class="van-cell-group van-hairline--top-bottom">
        <router-link to="/my">
          <div class="van-cell van-cell--clickable van-cell--large">
            <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
            <div class="van-cell__title"><span>个人中心</span></div>
            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
          </div>
        </router-link>
      </div>
      <div class="van-cell-group van-hairline--top-bottom">
        <div class="van-cell van-cell--clickable van-cell--large">
          <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
          <div class="van-cell__title"><span>技师规则</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </div>
      <div class="van-cell-group van-hairline--top-bottom">
        <router-link to="/qr-code">
          <div class="van-cell van-cell--clickable van-cell--large">
            <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
            <div class="van-cell__title"><span>二维码</span></div>
            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname: '',
      headerimg: '',
      activeNames: ['1']

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
    setTimeout(function () {
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).nick
      console.log(_that._data.headerimg)
    }, 1000)
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
}
header {
  width: 100%;
  background: #25034d;
  height: 150px;
}
.header {
  float: left;
  color: white;
  line-height: 150px;
  text-indent: 2em;
}
.headerimg {
  margin-left: 20px;
  width: 20%;
  float: left;
  margin-top: 40px;
  border-radius: 50%;
}
.van-cell-group__title {
  margin-top: 2vh;
  /* padding: 5px 5px 5px; */
  font-weight: bold;
  color: darkblue;
  text-align: left;
  background-color: whitesmoke;
  /* box-shadow: 5px 6px 8px 0px rgba(56, 56, 56, 0.21); */
}
.container {
  padding: 20px;
  text-align: left;
}
</style>
