<template>
  <div class="box">
    <h3>代理海报</h3>

    <div class="container">
      <header>
        <img :src="headerimg"
             class="headerimg" />
        <div class="headers">我要找到更多的客户！</div>
      </header>
      <div class="person">
        <h4>分享步骤</h4>
        <p>1，风向的狂扫肯定撒面对空门独立声卡减肥法</p>
        <p>1，风向的狂扫肯定撒面对空门独立声卡减肥法</p>
      </div>
      <div class="personimg">
        <van-swipe :autoplay="3000"
                   indicator-color="yellow"
                   :loop=false>
          <van-swipe-item v-for="(items,index) in imgurl"
                          :key="index"><img :src="items"
                 class="imgurl" /></van-swipe-item>
        </van-swipe>
      </div>

    </div>
    <agenttitle />
  </div>
</template>

<script>

import agenttitle from '../components/agent-title'
export default {
  name: 'HelloWorld',
  data () {
    return {
      openidsa: localStorage.getItem('openids'),
      operable: '',
      nickname: '',
      headerimg: '',
      activeNames: [],
      list: [],
      imgurl: ['https://s3.cn-northwest-1.amazonaws.com.cn/wechat-qr/MM-0W1rXFg9DP447319f4-0a8f-11ea-8010-0ac8cbd8795a_qr.jpg',
        'https://s3.cn-northwest-1.amazonaws.com.cn/wechat-qr/MM-0W1rXFg9DP57f13470-0a8f-11ea-8010-0ac8cbd8795a_qr.jpg'],
      effectivedate: ''

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
      var unionid = JSON.parse(localStorage.getItem('userinfo')).unionid
      _that.$http.post(_that.$api + '/wx/event/user_event/by_usertype/', {
        'unionid': unionid,
        'user_type': 'agent'
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (response) {
          var data = response.data.qr_url
          data = _that.trim(data)
          _that._data.imgurl = data.split(',')
          _that._data.effectivedate = response.data.expire_date
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 800)
  },
  methods: {
    trim (url) {
      url = url.replace(/\]/g, '')
      url = url.replace(/\[/g, '')
      url = url.replace(/\'/g, '')
      return url
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  },
  components: {
    'agenttitle': agenttitle

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #ffa200;
}
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: white;
  background: #f34230;
}
.container {
  width: 90%;
  margin-left: 5%;
  margin-top: 30px;
  background: white;
  border-radius: 10px;
}
header {
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: #f34230;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.headers {
  float: left;
  color: white;
  font-size: 20px;
  line-height: 100px;
  text-indent: 2em;
}

.headerimg {
  margin-left: 20px;
  width: 20%;
  float: left;
  margin-top: 40px;
  border-radius: 50%;
}
.person {
  margin-top: 20px;
  border-bottom: 1px dashed #f34230;
}
.person p {
  font-size: 13px;
  color: #7d7e80;
}
.imgurl {
  width: 50%;
}
.personimg {
  padding: 20px 0;
}
</style>
