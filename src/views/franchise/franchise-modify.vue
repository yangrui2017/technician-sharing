<template>
  <div class="box">
    <van-nav-bar title="个人信息"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="personal.bank_name"
                 center
                 clearable
                 required
                 label="银行名称"
                 placeholder="请输入银行名称" />
      <van-field v-model="personal.bank_acc_name"
                 required
                 label="开户姓名"
                 placeholder="请输入开户人姓名" />
      <van-field v-model="personal.bank_account"
                 required
                 label="银行账号"
                 type="tel"
                 placeholder="请输入您的银行卡账号" />
      <van-field v-model="personal.phone"
                 center
                 clearable
                 required
                 label="手机号码"
                 type="tel"
                 placeholder="请输入手机号码" />

      <van-field v-model="personal.address"
                 label="现住址"
                 placeholder="请输入您的地址" />
    </van-cell-group>
    <div class="division"
         @click="postfrom()">修改个人信息</div>

  </div>
</template>

<script>
import { Icon, Cell, CellGroup, Toast, NavBar, Field, Button } from 'vant'
var url = require('../worker/url.js')
export default {
  name: 'HelloWorld',
  data () {
    return {
      personal: {
        bank_name: "",
        bank_account: "",
        bank_acc_name: "",
        phone: '',
        address: '',
        unionid: ""
      }

    }
  },
  mounted () {
    var _that = this;
    var store_id = JSON.parse(sessionStorage.getItem('nowstore')).store_id;
    var partnerInfo = JSON.parse(localStorage.getItem('userinfo')).partnerInfo;
    console.log(partnerInfo)
    _that._data.personal.bank_account = partnerInfo.bank_account
    _that._data.personal.bank_acc_name = partnerInfo.bank_acc_name
    _that._data.personal.phone = partnerInfo.phone
    _that._data.personal.address = partnerInfo.address
    _that._data.personal.unionid = partnerInfo.unionid
    _that._data.personal.bank_name = partnerInfo.bank_name
  },
  methods: {
    postfrom () {
      var _that = this;

      _that.$http
        .post(_that.$api + '/wx/ptnr/update', _that._data.personal)
        .then(rs => {
          if (rs.data.errcode == "0") {
            Toast('修改信息成功');
            _that.$router.push({
              path: '/my'
            })
          } else {
            Toast('修改信息失败')
          }

        })
        .catch(err => {
          console.log(err)
        })


    },
    onClickLeft () {
      this.$router.push({
        path: '/franchise-partner'
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },



  },
  components: {

    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-field': Field,
    'van-nav-bar': NavBar, 'van-button': Button,

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background-color: rgb(41, 89, 233);
  color: white;
}
.division {
  width: 90%;
  margin: 60px 0 0 5%;
  border-radius: 10px;
  height: 50px;
  color: white;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(41, 89, 233);
}
.van-nav-bar__title {
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

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
</style>
