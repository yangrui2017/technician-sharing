<template>

  <div class="box">
    <h3>加盟店伙伴申请</h3>

    <van-cell-group>

      <van-field v-model="personal.name"
                 required
                 label="个人姓名"
                 placeholder="请输入姓名" />
      <van-field v-model="personal.person_id"
                 required
                 label="身份证号"
                 type="tel"
                 placeholder="请输入身份证号" />
      <van-field v-model="personal.bank_name"
                 required
                 label="银行名称"
                 type="tel"
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
      <van-field v-model="personal.bank_name"
                 required
                 label="银行名称"
                 type="tel"
                 placeholder="请输入银行名称" />

      <van-field v-model="personal.phone"
                 center
                 clearable
                 required
                 label="手机号码"
                 type="tel"
                 placeholder="请输入手机号码">
        <van-button slot="button"
                    size="small"
                    type="warning"
                    @click="phoneverification('personal')">发送验证码</van-button>
      </van-field>
      <van-field v-model="perverification"
                 center
                 clearable
                 required
                 label="短信验证"
                 type="tel"
                 placeholder="请输入短信验证码">
        <van-button slot="button"
                    size="small"
                    type="warning"
                    @click="verifications('personal')">点击验证</van-button>
      </van-field>

      <van-cell title="上传身份证"
                is-link
                :value="degree"
                to="/franchise-idcard"
                @click="bindidcard()" />
      <van-field v-model="personal.address"
                 label="现住址"
                 placeholder="请输入您的地址" />

    </van-cell-group>
    <van-button round
                type="warning"
                size="normal"
                @click="postfrom(personal)">注册加盟店伙伴</van-button>

  </div>
</template>

<script>
import { Area, Field, Popup, RadioGroup, Radio, Cell, CellGroup, Picker, Button, Toast, Col, Row, Tab, Tabs, Checkbox, CheckboxGroup } from 'vant'
import { setTimeout } from 'timers'
import md5 from 'js-md5'
import Exif from 'exif-js'
import pice from '../../assets/pice.png'
var url = require('../worker/url.js')
export default {

  data () {
    return {
      degree: '',
      license: pice,
      personalcity: '',
      companycity: '',
      pertelonoff: 'false',
      comtelonoff: 'false',
      address: '请输入地址',

      showPicker: false,
      columns: ['本科', '大专', '高中及以下', '初中', '小学'],
      showArea: false,
      perverification: '',
      comverification: '',
      vcode: '',
      personal: {
        unionid: '',
        partner_type: "store",
        name: '',
        bank_account: "",
        bank_acc_name: "",
        bank_name: "",
        person_id: '',
        phone: '',
        idcard1: '',
        idcard2: '',
        holdcard: '',
        address: ''

      }

    }
  },
  mounted () {
    var _that = this
    var degree = _that.getQueryString('degree')
    var onoff = sessionStorage.getItem('imgonoff2')
    var pertelonoff = sessionStorage.getItem('pertelonoff')
    if (onoff == 'true') {
      _that._data.personal = JSON.parse(sessionStorage.getItem('agntindividual'))
      _that._data.personalcity = sessionStorage.getItem('personalcity')
      _that._data.pertelonoff = sessionStorage.getItem('pertelonoff')
    }
    if (pertelonoff == 'true') {
      _that._data.perverification = '已验证*****'
    }
    if (degree == 'ok') {
      Toast('身份证上传成功')
      _that._data.degree = '已完成'
    }
  },
  methods: {
    bindidcard () {
      var _that = this
      sessionStorage.setItem('agntindividual', JSON.stringify(_that._data.personal))
      sessionStorage.setItem('personalcity', _that._data.personalcity)
      sessionStorage.setItem('imgonoff2', 'true')
      sessionStorage.setItem('pertelonoff', _that._data.pertelonoff)
    },
    onChangeDetail (val) {
      var _that = this
      _that._data.personal.education = val
      _that.showPicker = false
    },
    onConfirm (values) {
      var _that = this
      _that._data.personalcity = values.map((item) => item.name).join('/')
      _that._data.personal.city = values[1].name
      _that._data.personal.area = values[2].name
      _that.showArea = false
    },
    phoneverification (value) {
      Toast('消息已发，请注意查收')
      var _that = this
      var phone = _that._data.personal.phone
      if (phone == '') {
        Toast('号码不能为空')
      } else {
        _that.$http
          .get(url + '/api/login/getVcodeByWxOpen?tel=' + phone)
          .then(rs => {
            if (rs.data.status == 1) {
              Toast('消息已发，请注意查收')
              _that._data.vcode = rs.data.vcode
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    verifications (value) {
      var _that = this
      if (_that._data.perverification != '') {
        var md5text = _that._data.perverification + 'send'
        md5text = md5(md5text)
        if (md5text == _that._data.vcode) {
          Toast('验证成功')
          _that._data.pertelonoff = true
          _that._data.perverification = '已验证*****'
        } else {
          Toast('验证失败，请重新发送验证码')
        }
      } else {
        Toast('号码不能为空')
      }

    },
    // 个人注册
    postfrom () {
      var _that = this;
      console.log(_that._data)
      if (_that._data.pertelonoff == 'false') {
        Toast('手机验证未通过')
      } else if (_that._data.personal.address == '') {
        Toast('请选择现住址')
      } else if (_that._data.degree == '') {
        Toast('请上传身份证')
      } else {
        _that._data.personal.unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
        _that._data.personal.idcard1 = JSON.parse(sessionStorage.getItem('franchiseimage')).idcard1
        _that._data.personal.idcard2 = JSON.parse(sessionStorage.getItem('franchiseimage')).idcard2
        _that._data.personal.holdcard = JSON.parse(sessionStorage.getItem('franchiseimage')).holdcard
        _that._data.personal.is_active = 1
        if (JSON.parse(localStorage.getItem('userinfo')).partnerInfo != null) {
          _that.$http
            .post(_that.$api + '/wx/ptnr/update', _that._data.personal)
            .then(rs => {
              if (rs.data.errcode == "0") {
                Toast('请填写加盟店信息')
                _that.$router.push({
                  path: '/add-franchise'
                })
              } else {
                Toast('加盟伙伴注册失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          _that.$http
            .post(_that.$api + '/wx/ptnr/register', _that._data.personal)
            .then(rs => {
              if (rs.data.errcode == "0") {
                Toast('请填写加盟店信息')
                _that.$router.push({
                  path: '/add-franchise'
                })
              } else {
                Toast('加盟伙伴注册失败')
              }

            })
            .catch(err => {
              console.log(err)
            })
        }



      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
  },
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-popup': Popup,
    'van-field': Field,
    'van-area': Area,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-picker': Picker,
    'van-button': Button,
    'van-col': Col,
    'van-row': Row,
    'van-checkbox': Checkbox,
    'van-checkbox-group': CheckboxGroup

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: white;
  background: #f3bc30;
}
.service {
  font-size: 14px;
  line-height: 24px;
}
.servicetext {
  font-size: 14px;
  line-height: 24px;
}
.headertext a {
  color: white;
}

.box {
  width: 100%;
  height: 100%;
  background: white;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;

  margin-top: 20px;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.imgurl {
  width: 100%;
}
.imgurl2 {
  width: 80%;
  height: 200px;
}
.van-button--normal {
  width: 75%;
  margin-top: 20px;
}
</style>
