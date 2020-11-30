<template>
  <div class="box">
    <h3>余额提现</h3>
    <div class="header">
      <div class="account">微信账户</div>
      <div class="changecard">更换</div>
    </div>
    <div class="cont ">
      <van-cell-group>
        <van-field v-model="value1"
                   label="￥"
                   placeholder="0.00" />

      </van-cell-group>
      <div class="text">
        <div class="text">当前可提现余额为{{withdraw}}元</div>
        <div class="text2"
             @click="allwithdraw()">全部提现</div>
      </div>

      <div class="postform"
           @click="submit()">提现</div>
    </div>

  </div>
</template>

<script>
import { Button, Toast, Field, CellGroup, Cell, Col, Row } from 'vant'
var url = require('./worker/url.js')
export default {
  name: 'HelloWorld',
  data () {
    return {
      value1: '',
      withdraw: ""
    }
  },
  mounted () {
    var _that = this
    _that.run()
  },
  methods: {

    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      var store_text = JSON.parse(sessionStorage.getItem('store_text'))
      _that._data.withdraw = store_text.withdraw
    },
    allwithdraw () {
      var _that = this;
      _that._data.value1 = _that._data.withdraw

    },
    submit () {
      var _that = this;
      if (_that._data.value1 > _that._data.withdraw) {
        Toast("输入的提现金额大于可提现金额")
      } else if (_that._data.value1 == "") {
        Toast("提现金额不能为空")
      } else {
        var store_id = JSON.parse(sessionStorage.getItem('store_text')).store_id
        var open_id = JSON.parse(localStorage.getItem('userinfo')).muser.open_id
        var bank_name = JSON.parse(localStorage.getItem('userinfo')).partnerInfo.bank_name
        var account_number = JSON.parse(localStorage.getItem('userinfo')).partnerInfo.bank_account
        var mobile = JSON.parse(localStorage.getItem('userinfo')).partnerInfo.phone
        var realname = JSON.parse(localStorage.getItem('userinfo')).partnerInfo.bank_acc_name
        _that.$http
          .post(url + '/api/store/applyCashMoney', {
            "access_key": "xunjiepf",
            "openid": open_id,
            "store_id": store_id,
            "cash": Number(_that._data.value1),
            "bank_name": bank_name,
            "account_number": account_number,
            "realname": realname,
            "mobile": mobile
          })
          .then(rs => {
            if (rs.data.errmsg) {
              Toast(rs.data.errmsg)
            } else {
              if (rs.data == "1") {
                Toast("提现申请成功")
              } else {
                Toast("网络错误")
              }
            }



          })
          .catch(err => {
            console.log(err)
          })
      }

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
.text {
  height: 60px;
  width: 90%;
  margin-left: 5%;
}
.text div:nth-of-type(1) {
  float: left;
  width: 50%;
}
.text div:nth-of-type(2) {
  float: right;
  width: 40%;
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
