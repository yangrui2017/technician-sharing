<template>
  <div class="box">
    <div class="cover"
         v-if="onoff">
      <h3>账户身份</h3>
      <div class="cont">
        <img src='../assets/examine.png'
             class="img">
        <div class="text">{{language}}</div>

      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Col, Row, Button, Toast } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      onoff: false,
      show: false,
      nickname: '',
      headerimg: '',
      sharenumber: '20',
      comm: '',
      commPaid: '',
      commlCaimed: '',
      list: [],
      language: '',
      fanslist: [],
      fansnumber: "",

    }
  },
  created () {
    console.log()
    var userinfo = JSON.parse(localStorage.getItem('userinfo'))
    var onoff = true
    if (userinfo == 'undefined' || userinfo == null || onoff) {
      var _that = this
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('userinfo', JSON.stringify(response.data))
            var arr = response.data.wk_role;
            if (arr === null) {
              _that.$router.push({
                path: '/agent-examine'
              })
            } else if (arr == "partner") {
              if (response.data.partnerInfo.is_active == "2") {
                _that.$router.push({
                  path: '/franchise-partner'
                })
              } else {
                _that._data.language = '您还不是加盟伙伴，请等待申请通过或再次申请'
              }

            } else if (arr == "worker") {
              _that._data.language = '您已加盟技师，请在技师账户查看您的权益'
            } else if (arr == "agent") {
              if (response.data.agentInfo.is_active == "2") {
                _that.$router.push({
                  path: '/agent-account'
                })
              } else {
                _that._data.language = '您还不是代理，请等待申请通过或再次申请'
              }

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




  },
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabletitle {
  text-align: center;
  line-height: 60px;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}
h3 {
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
}
.cover {
  width: 100%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  z-index: 100;
}
.cont {
  margin-top: 60px;
}
.joinbut {
  margin-top: 100px;
}
.img {
  width: 80px;
  height: 104px;
}
.text {
  line-height: 40px;
  width: 90%;
  margin-left: 5%;
}
table.hovertable {
  width: 100%;
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #999999;
  border-collapse: collapse;
}
table.hovertable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.hovertable tr {
  /* background-color: #d4e3e5; */
}
table.hovertable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
p {
  margin: 0;
}

header {
  width: 100%;
  background: #ffda44;
  height: 150px;
}
.listtext {
  height: 30px;
}
.detailed {
  width: 50%;
  float: left;
  text-align: left;
  text-indent: 1em;
  line-height: 30px;
  font-size: 13px;
}
.header {
  float: left;
  color: black;
  line-height: 150px;
  text-indent: 2em;
}
.capitaltext {
  font-size: 14px;
  line-height: 30px;
}
.headerimg {
  margin-left: 20px;
  width: 20%;
  float: left;
  margin-top: 40px;
  border-radius: 50%;
}
.headertitle {
  font-size: 15px;
  line-height: 40px;
  margin-bottom: 10px;
  border-left: 5px solid #1989fa;
  background: #2177ad;
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
.listdiv {
  background: white;
  width: 96%;
  margin-left: 2%;
  color: black;
  border-radius: 5px;
}
.listdivs {
  padding-bottom: 10px;
  background: white;
  width: 96%;
  margin-left: 2%;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
}
.listtitle {
  margin-top: 20px;
  font-size: 16px;
  text-align: left;
  text-indent: 1em;
  line-height: 40px;
  font-weight: 600;
  height: 40px;
  border-bottom: 1px solid #969799;
}
.listtitle div {
  width: 50%;
  float: left;
}
.listtitle .listtitlediv {
  width: 30%;
  float: right;
}

.mytitle {
  background: white;
}
.balance {
  font-size: 14px;
}
.balanceint {
  font-size: 20px;
  font-weight: 600;
  width: 50%;
  margin-left: 25%;
  border-bottom: 1px solid black;
}

.reminder {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
}
.but {
  margin-top: 10px;
  margin-right: 10px;
}
.buts {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.integraltext {
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
}
</style>
