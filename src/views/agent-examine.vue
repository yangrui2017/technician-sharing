<template>

  <div class="box">
    <h3>代理审核</h3>
    <div class="cont">
      <img src='../assets/examine.png'
           class="img">
      <div class="text">{{language}}</div>
      <div>{{unionid}}</div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
export default {

  data () {
    return {
      language: '',
      unionid: '',
      uid: ''

    }
  },

  created () {
    var _that = this
    var userinfo = localStorage.getItem('userinfo')
    var onoff = true
    if (userinfo == 'undefined' || userinfo == null || onoff) {
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('userinfo', JSON.stringify(response.data))
            if (response.data.errcode == "1") {
              _that._data.language = '请先关注E帮工作台公众号'
            }
            var arr = response.data.wk_role;
            if (arr == null) {
              _that.run()
            } else if (arr == "partner") {
              _that._data.language = '您已经是加盟店，无需注册代理'
            } else if (arr == "worker") {
              _that._data.language = '您已经是技师，无需注册代理'
            } else if (arr == "agent") {
              _that.run()
            }


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
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      var user_headimg = JSON.parse(localStorage.getItem('userinfo')).muser.headimgurl
      var nick_name = JSON.parse(localStorage.getItem('userinfo')).muser.nick

      _that.$http
        .get(_that.$api + '/wx/agent/get_by_unionid?unionid=' + unionid)
        .then(rs => {
          if (rs.data == null) {
            _that.$router.push({
              path: '/agent-agreement?type=agent'
            })
          } else {
            if (rs.data.is_active == '1') {
              _that._data.language = '提交成功，资料正在审核中...'
            } else if (rs.data.is_active == '0') {
              sessionStorage.setItem('agentmessage', JSON.stringify(rs.data))
              _that.$router.push({
                path: '/agent-agreement?type=agent'
              })
            } else if (rs.data.is_active == '2') {
              _that._data.language = '您已经是代理了'
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  padding-top: 60px;
}
h3 {
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
}
.agreebox {
  width: 100%;
  line-height: 60px;
  font-weight: 600;
  background: #ffda44;
  text-align: center;
  position: fixed;
  bottom: 0;
}

.van-tab__pane {
  margin-top: 10px;
}
.cont {
  margin-top: 60px;
}
.img {
  width: 80px;
  height: 104px;
}
.text {
  line-height: 40px;
}
</style>
