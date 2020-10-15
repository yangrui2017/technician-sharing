<template>
  <div class="box">
    <h3>余额提现</h3>
    <div class="header">
      <div class="account">微信账户</div>
      <div class="changecard"
           @click="changebank()">更换</div>
    </div>
    <div class="cont ">
      <van-cell-group>
        <van-field v-model="value1"
                   label="￥"
                   placeholder="0.00" />

      </van-cell-group>
      <van-row>
        <van-col span="12"
                 class="text">当前可提现余额为0.00元</van-col>
        <van-col span="4"></van-col>
        <van-col span="8"
                 class="text2">全部提现</van-col>
      </van-row>
      <div class="postform">提现</div>
    </div>

  </div>
</template>

<script>
import { Button, Toast, Field, CellGroup, Cell, Col, Row } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      value1: ''
    }
  },
  mounted () {
    var _that = this
    _that.run()
  },
  methods: {
    changebank () {
      this.$router.push({
        path: '/bank-card'
      })
    },
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).muser.headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).muser.nick

      _that.$http
        .get(_that.$api + '/wx/agent/get_by_unionid?unionid=' + unionid)
        .then(rs => {
          if (rs.data == null) {
            Toast('您还不是代理请先注册代理')
            _that.$router.push({
              path: '/agent-agreement?type=agent'
            })
          } else {
            if (rs.data.is_active == '0') {
              Toast('您还不是代理请先注册代理')
              sessionStorage.setItem('agentmessage', JSON.stringify(rs.data))
              _that.$router.push({
                path: '/agent-agreement?type=agent'
              })
            } else if (rs.data.is_active == '2') {
              _that.$http
                .post(_that.$api + '/wx/agent/get_his', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.comm = response.data.comm
                  _that._data.commlCaimed = response.data.commlCaimed
                  _that._data.commPaid = response.data.commPaid
                  _that._data.list = response.data.comm_his.awardByMonth
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
    'van-button': Button,
    'van-cell-group': CellGroup,
    'van-field': Field,
    'van-cell': Cell,
    'van-row': Row,
    'van-col': Col

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 0;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}
.header {
  width: 100%;
  background: white;
  padding-top: 20px;
}
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: black;
  background: #ffda44;
}

.account {
  width: 90%;
  line-height: 60px;
  margin-top: 20px;
  background: #c52525;
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  margin-left: 5%;
}
.postform {
  width: 90%;
  line-height: 50px;
  margin-top: 20px;
  background: #dec662;
  color: black;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  margin-left: 5%;
}
.changecard {
  width: 90%;
  margin-left: 5%;
  text-align: right;
  color: blue;
  line-height: 40px;
}
.cont {
  width: 100%;
  background: white;
  margin-top: 10px;

  padding-bottom: 20px;
}
.text {
  font-size: 14px;
  line-height: 50px;
}
.text2 {
  font-size: 16px;
  line-height: 50px;
  color: blue;
}
</style>
