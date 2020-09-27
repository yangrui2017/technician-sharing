<template>
  <div class="box">
    <van-nav-bar title=""
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <template #right>
        <van-icon name="setting-o"
                  size="18" />
      </template>
    </van-nav-bar>

    <header>
      <div class="usertext">
        <img :src="headerimg"
             class="headerimg" />
        <div class="header">{{nickname}}</div>
      </div>
      <div class="detailed">
        <van-row>
          <van-col span="12">账户余额：<span style="color:#72ee42">12323</span></van-col>

          <van-col span="12">可提现金额：232</van-col>
        </van-row>
      </div>
    </header>
    <section>
      <van-cell title="申请提现"
                is-link
                class="cells"
                to="withdrawal" />
      <van-cell title="资金明细"
                is-link
                class="cells"
                to="franchise-details" />
      <van-cell title="门店技师"
                is-link
                class="cells"
                to="franchise-worker" />

      <van-cell title="管理技师"
                is-link
                class="cells"
                to="franchise-adopt" />
      <van-cell title="使用帮助"
                is-link
                class="cells"
                to="help-text" />
    </section>

  </div>
</template>

<script>
import { Tab, Tabs, Col, Row, Button, Toast, NavBar, Icon, Cell, CellGroup } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      onoff: false,
      jonagent: false,
      show: false,
      nickname: '2132132',
      headerimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599727586313&di=9c396094d10f0aa13306dd4eb9802ca6&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F30%2F20140830180834_XuWYJ.png',
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
    var openid = localStorage.getItem('openids')
    var onoff = true
    if (openid == 'undefined' || openid == null || onoff) {
      var _that = this
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('openids', response.data.openid)
            localStorage.setItem('userinfo', JSON.stringify(response.data))
            if (response.data.xcx_uid == null) {
              _that.run()
            } else {
              _that._data.onoff = true
              _that._data.language = '您已加盟技师，请在技师账户查看您的权益'
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
            // window.location.replace(link)
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
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).userData.unionid
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).userData.headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).userData.nickname

      _that.$http
        .get(_that.$api + '/wx/agent/get_by_unionid?unionid=' + unionid)
        .then(rs => {
          if (rs.data == null) {
            _that._data.onoff = true
            _that._data.jonagent = true
            _that._data.language = '想要加盟代理吗？成为E帮车服代理，您将拥有所推广会员的所有服务消费和商品消费的提成权益，一次推广，终身受益！加盟请点击公众号“代理加盟”菜单申请注册。'
          } else {
            if (rs.data.is_active == '0') {
              _that._data.onoff = true
              _that._data.jonagent = true
              _that._data.language = '想要加盟代理吗？成为E帮车服代理，您将拥有所推广会员的所有服务消费和商品消费的提成权益，一次推广，终身受益！加盟请点击公众号“代理加盟”菜单申请注册。'
            } else if (rs.data.is_active == '2') {
              _that.$http
                .post(_that.$api + '/wx/agent/get_his', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.comm = response.data.comm.amount
                  _that._data.commlCaimed = response.data.comm.amount_claimed
                  _that._data.commPaid = response.data.comm.amount_paid
                  _that._data.list = response.data.comm_his.awardByMonth
                })
                .catch(function (error) {
                  console.log(error)
                });
              _that.$http
                .post(_that.$api + '/wx/worker/fans', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.fanslist = response.data.fan_member;
                  _that._data.fansnumber = response.data.fan_member.length;

                  console.log()
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onClickLeft () {
      this.$router.push({
        path: '/franchise-list'
      })
    },
    onClickRight () {
      this.$router.push({
        path: '/franchise-list'
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    join () {
      var _that = this
      _that.$router.push({
        path: '/agent-examine'
      })
    },
    withdrawal () {
      var _that = this
      _that.$router.push({
        path: '/withdrawal'
      })
    },

    capitallink (value, index) {
      var _that = this
      var date = new Date()
      if (index == undefined) {
        var month = date.getMonth() + 1
      } else {
        var month = index
      }
      _that.$router.push({
        path: '/fund-details?type=' + value + '&month=' + month
      })
    }
  },
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background-color: rgb(41, 89, 233);
  color: white;
}
.van-nav-bar__text,
.van-icon {
  color: white;
}
.van-hairline--bottom::after {
  border: none;
}
.van-cell__title {
  text-align: left;
  text-indent: 2em;
}
.cells i {
  color: black;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}

header {
  width: 100%;
  background: rgb(41, 89, 233);
  height: 190px;
}
.headerimg {
  width: 80px;
  border-radius: 50%;
}

.header {
  color: white;
  line-height: 40px;
  text-align: center;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
.detailed {
  line-height: 60px;
  color: white;
  font-size: 14px;
}
</style>
