<template>
  <div class="box">
    <header>
      <div class="usertext">
        <img :src="headerimg"
             class="headerimg" />
        <div class="header">{{nickname}}</div>
      </div>
      <div class="userpoints">当前积分：{{points}}</div>
    </header>

    <div class="list"
         v-for="(item,index) in list"
         :key="index">
      <div class="listbox">
        <p>分享给{{item.viewer_name}}</p>
        <p>{{item.modified_on}}</p>
      </div>
      <div class="listbox fonts">获得{{item.usr_points}}积分</div>
      <el-divider></el-divider>
    </div>
    <div class="footer">----------------显示所有记录----------------</div>

  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname: '',
      headerimg: '',
      sharenumber: '20',
      list: [],
      points: ''

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

    _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).headimgurl
    _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).nick
    var openid = localStorage.getItem('openids')
    _that.$http.get(_that.$api + '/wx/event/user_event/result_by_openid/?openid=' + openid)
      .then(function (response) {
        _that._data.list = response.data.user_event_result
      })
      .catch(function (error) {
        console.log(error)
      })
    _that.$http.get(_that.$api + '/wx/event/user_event/global_point/?openid=' + openid)
      .then(function (response) {
        _that._data.points = response.data.points
      })
      .catch(function (error) {
        console.log(error)
      })
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
.list {
  width: 100%;
  height: 60px;
  overflow: initial;
}
.listbox {
  width: 50%;
  float: left;
  height: 100%;
  font-size: 15px;
  line-height: 30px;
  color: black;
}
.listbox p {
  margin: 0;
}
.fonts {
  font-size: 20px;
  font-weight: bold;
  color: red;
  line-height: 60px;
}
.el-divider {
  float: left;
  margin: 0;
}
.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
.usertext {
  height: 80%;
  overflow: hidden;
}
.userpoints {
  height: 20%;
  text-align: left;
  color: white;
  line-height: 30px;
  margin-left: 20px;
}
</style>
