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
      <div class="detailed">
        <van-row>
          <van-col span="12">本月订单数：100</van-col>

          <van-col span="12">本月盈利：144450</van-col>
        </van-row>
      </div>
    </header>
    <section>
      <van-cell title="申请提现"
                is-link
                class="cells"
                to="withdrawal" />
      <van-cell title="账单明细"
                is-link
                class="cells"
                to="franchise-details" />
      <van-cell title="门店技师"
                is-link
                class="cells"
                to="franchise-worker" />

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
      nickname: '上海市某某店',
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

  },
  mounted () {
    this.run()
  },
  methods: {
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).muser.headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).muser.nick

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
  line-height: 30px;
  color: white;
  font-size: 14px;
}
</style>
