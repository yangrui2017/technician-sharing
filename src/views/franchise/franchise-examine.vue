<template>

  <div class="box">
    <h3>加盟店审核</h3>
    <div class="cont">
      <img src='../../assets/examine.png'
           class="img">
      <div class="text">{{language}}</div>
      <div>{{text1}}</div>
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
      uid: '',
      text: "",
      text1: ""

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
            var arr = response.data.mpuser.wk_role;
            if (arr == null) {
              _that.run()
            } else {
              arr.forEach((item, index) => {
                if (item == "partner") {
                  _that._data.language = '您已经是加盟店'
                } else {
                  _that.run()
                }
              })
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
      var unionid = JSON.parse(localStorage.getItem('userinfo')).userData.unionid
      var user_headimg = JSON.parse(localStorage.getItem('userinfo')).userData.headimgurl
      var nick_name = JSON.parse(localStorage.getItem('userinfo')).userData.nickname

      _that.$http
        .post(_that.$api + '/wx/ptnr/get_partner_uid', {
          "unionid": unionid
        })
        .then(rs => {
          if (rs.data == null) {
            _that.$router.push({
              path: '/franchise-agreement'
            })
          } else {
            if (rs.data.ptnr.is_active == '1') {
              _that._data.language = '提交成功，资料正在审核中...'
            } else if (rs.data.ptnr.is_active == '0') {
              sessionStorage.setItem('franchisemessage', JSON.stringify(rs.data))
              _that.$router.push({
                path: '/franchise-agreement'
              })
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
