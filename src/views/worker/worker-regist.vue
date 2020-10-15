<template>

  <div class="box">
    <h3>注册信息</h3>
    <h4>基础信息</h4>
    <van-field readonly
               clickable
               name="area"
               :value="city"
               label="服务区域"
               input-align="right"
               placeholder="点击选择省市区"
               @click="showArea = true" />
    <van-popup v-model="showArea"
               position="bottom">
      <van-area :area-list="areaList"
                @confirm="onConfirm"
                @cancel="showArea = false" />
    </van-popup>
    <van-field v-model="registerform.w_name"
               label="姓名"
               placeholder="请输入您的姓名" />
    <van-field v-model="registerform.w_id_card"
               label="身份证"
               type="tel"
               placeholder="请输入您的身份证" />
    <van-field v-model="registerform.user_tel"
               center
               clearable
               label="手机号码"
               type="tel"
               placeholder="请输入手机号码">
      <template #button>
        <van-button size="small"
                    type="primary"
                    @click="phoneverification()">发送验证码</van-button>
      </template>
    </van-field>
    <van-field v-model="verification"
               center
               clearable
               type="tel"
               label="短信验证码"
               placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small"
                    type="primary"
                    @click="verifications()">验证手机</van-button>
      </template>
    </van-field>
    <van-field readonly
               clickable
               name="picker"
               :value="registerform.education"
               label="文化程度"
               placeholder="点击选择"
               @click="showPicker = true" />
    <van-popup v-model="showPicker"
               position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  @confirm="onChangeDetail"
                  @cancel="showPicker = false" />
    </van-popup>

    <van-cell title="是否有固定工作">
      <van-radio-group v-model="registerform.have_job">
        <van-row>
          <van-col span="12">
            <van-radio name="0"
                       checked-color="#07c160">否</van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="1"
                       checked-color="#07c160">是</van-radio>
          </van-col>
        </van-row>
      </van-radio-group>
    </van-cell>
    <van-cell title="是否有上门洗车经历">
      <van-radio-group v-model="registerform.is_experience">
        <van-row>
          <van-col span="12">
            <van-radio name="0"
                       checked-color="#07c160"
                       @click="hasexperiences = false">否</van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="1"
                       checked-color="#07c160"
                       @click="hasexperiences = true">是</van-radio>
          </van-col>
        </van-row>
      </van-radio-group>
    </van-cell>
    <van-cell title="1年以内/1年以上"
              v-show="hasexperiences">
      <van-radio-group v-model="experiences">
        <van-row>
          <van-col span="12">
            <van-radio name="0"
                       checked-color="#07c160">否</van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="1"
                       checked-color="#07c160">是</van-radio>
          </van-col>
        </van-row>
      </van-radio-group>
    </van-cell>
    <van-cell title="是否有电动车">
      <van-radio-group v-model="registerform.is_vehicle">
        <van-row>
          <van-col span="12">
            <van-radio name="0"
                       checked-color="#07c160">否</van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="1"
                       checked-color="#07c160">是</van-radio>
          </van-col>
        </van-row>
      </van-radio-group>
    </van-cell>
    <van-cell title="是否有专用洗车机">
      <van-radio-group v-model="registerform.is_washing_machine">
        <van-row>
          <van-col span="12">
            <van-radio name="0"
                       checked-color="#07c160">否</van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="1"
                       checked-color="#07c160">是</van-radio>
          </van-col>
        </van-row>
      </van-radio-group>
    </van-cell>
    <van-cell title="上传身份证"
              is-link
              :value="degree"
              to="/worker-idcard"
              @click="bindidcard()" />
    <van-field v-model="registerform.address"
               label="现住址"
               placeholder="请输入您的地址" />
    <van-field v-model="registerform.ice_name"
               label="紧急联系人"
               placeholder="请输入紧急联系人" />
    <div class="boxss">
      <van-row>
        <van-col span="9">
          <div class="ice_tel">紧急联系人手机号</div>
        </van-col>
        <van-col span="15">
          <input type="tel"
                 placeholder="请输入紧急联系人手机号"
                 class="van-field__control input"
                 v-model="registerform.ice_tel">

        </van-col>
      </van-row>
      <van-field readonly
                 clickable
                 name="picker"
                 v-show="store_onoff"
                 :value="storename"
                 label="选择加盟店"
                 placeholder="点击选择"
                 @click="showPicker2 = true" />
      <van-popup v-model="showPicker2"
                 position="bottom">
        <van-picker show-toolbar
                    value-key="store_name"
                    :columns="store_list"
                    @confirm="onChangeDetail2"
                    @cancel="showPicker2 = false" />
      </van-popup>
    </div>
    <div style="height:60px"></div>
    <div class="agreebox"
         @click="postfrom()">提交审核</div>

  </div>
</template>

<script>
import { Area, Field, Popup, RadioGroup, Radio, Cell, CellGroup, Picker, Button, Toast, Col, Row } from 'vant'
import md5 from 'js-md5'
var url = require('./url.js')
export default {

  data () {
    return {
      experiences: '1',
      hasexperiences: false,
      degree: '未完成',
      city: '',
      storename: "",
      store_onoff: true,
      store_list: [],
      telonoff: 'false',
      vcode: '',
      verification: '',
      address: '请输入地址',
      areaList: {
        province_list: {
          310000: '上海市'
        },
        city_list: {
          310100: '上海市',
        },
        county_list: {
          310101: '黄浦区',
          310104: '徐汇区',
          310105: '长宁区',
          310106: '静安区',
          310107: '普陀区',
          310109: '虹口区',
          310110: '杨浦区',
          310112: '闵行区',
          310113: '宝山区',
          310114: '嘉定区',
          310115: '浦东新区',
          310116: '金山区',
          310117: '松江区',
          310118: '青浦区',
          310120: '奉贤区',
          310151: '崇明区',
        }
      }, showPicker: false,
      showPicker2: false,
      columns: ['本科', '大专', '高中及以下', '初中', '小学'],
      showArea: false,
      registerform: {
        uid: '',
        area_id: '',
        province: '',
        city: '',
        area: '',
        w_name: '',
        w_id_card: '',
        justImagesId: '',
        backImagesId: '',
        holdImagesId: '',
        user_tel: '',
        have_job: '0',
        education: '',
        address: '',
        worker_type: '3',
        ice_name: '',
        ice_tel: '',
        is_experience: '0',
        is_vehicle: '1',
        is_washing_machine: '0',
        store_id: ""
      }

    }
  },

  created () {
  },
  mounted () {

    var _that = this;

    var degree = _that.getQueryString('degree')
    var onoff = sessionStorage.getItem('onoff')
    var telonoff = sessionStorage.getItem('telonoff')
    // if (JSON.parse(localStorage.getItem('userinfo')).store_list
    //   != "null") {
    //   _that._data.store_list = JSON.parse(localStorage.getItem('userinfo')).store_list
    // } if (JSON.parse(localStorage.getItem('userinfo')).store_list.length == 0) {
    //   _that.store_onoff = false
    // }
    if (onoff == 'true') {
      _that._data.registerform = JSON.parse(sessionStorage.getItem('registerform'))
      _that._data.city = sessionStorage.getItem('city')
      _that._data.telonoff = sessionStorage.getItem('telonoff')
    }
    if (telonoff == 'true') {
      _that._data.verification = '已验证*****'
    }
    if (degree == 'ok') {
      Toast('身份证上传成功')
      _that._data.degree = '已完成'
    }
  },
  methods: {
    onChangeDetail2 (val) {
      console.log(val)
      var _that = this
      _that._data.storename = val.store_name
      _that._data.registerform.store_id = val.store_id
      _that.showPicker2 = false
    },
    onChangeDetail (val) {
      var _that = this
      _that._data.registerform.education = val
      _that.showPicker = false
    },
    onConfirm (values) {
      var _that = this
      _that._data.city = values.map((item) => item.name).join('/')
      _that._data.registerform.province = values[0].name
      _that._data.registerform.city = values[1].name
      _that._data.registerform.area = values[2].name
      _that.showArea = false
    },
    phoneverification () {
      var _that = this
      if (_that._data.registerform.user_tel == '') {
        Toast('号码不能为空')
      } else {
        _that.$http
          .get(url + '/api/login/getVcodeByWxOpen?tel=' + _that._data.registerform.user_tel)
          .then(rs => {
            if (rs.data.status == 1) {
              Toast('消息已发，请注意查收')
              _that._data.vcode = rs.data.vcode
            } else {
              Toast('消息发送失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    bindidcard () {
      var _that = this
      sessionStorage.setItem('registerform', JSON.stringify(_that._data.registerform))
      sessionStorage.setItem('onoff', 'true')
      sessionStorage.setItem('city', _that._data.city)
      sessionStorage.setItem('telonoff', _that._data.telonoff)
    },
    verifications () {
      var _that = this
      if (_that._data.verification != '') {
        var md5text = _that._data.verification + 'send'
        md5text = md5(md5text)
        if (md5text == _that._data.vcode) {
          _that._data.telonoff = true
          _that._data.verification = '已验证*****'
          Toast('验证成功')
        } else {
          Toast('验证码错误')
          _that._data.verification = ''
        }
      } else {
        Toast('验证码不能为空')
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    postfrom () {
      var _that = this
      _that.addresstranslation(_that._data.registerform.address)
      if (_that._data.telonoff == 'false') {
        Toast('手机验证未通过')
      } else if (_that._data.registerform.province == '') {
        Toast('请选择服务区域')
      } else if (_that._data.registerform.education == '') {
        Toast('请选择文化程度')
      } else if (_that._data.registerform.address == '') {
        Toast('请选择现住址')
      } else if (_that._data.registerform.ice_name == '') {
        Toast('请输入紧急联系人姓名')
      } else if (_that._data.registerform.ice_tel == '') {
        Toast('请输入紧急联系人手机号')
      } else if (_that._data.degree == '') {
        Toast('请上传身份证')
      } else {
        Toast('正在提交审核')
        if (_that._data.hasexperiences) {
          _that._data.registerform.experiences = _that._data.experiences
        }
        if (JSON.parse(localStorage.getItem('userinfo')).store_list.length == 0) {

          _that._data.registerform.store_id = "0"

        }
        _that._data.registerform.uid = sessionStorage.getItem('uid');

        _that._data.registerform.justImagesId = JSON.parse(sessionStorage.getItem('personal')).idcard1.id
        _that._data.registerform.backImagesId = JSON.parse(sessionStorage.getItem('personal')).idcard2.id
        _that._data.registerform.holdImagesId = JSON.parse(sessionStorage.getItem('personal')).idcard3.id
        console.log(_that._data.registerform)
        _that.$http
          .post(url + '/api/register/saveWorker?access_key=xunjiepf', _that._data.registerform)
          .then(rs => {
            if (rs.data.errcode == '1') {
              _that.$router.push({
                path: '/worker-examine'
              })
            } else {
              Toast(rs.data.errmsg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 通过地址获取经纬度
    addresstranslation (res) {
      var _that = this
      const KEY = '7hhI8dTWwLRQ8KLTWqi8kOoLUhClNDxS' // key 秘钥自己申请
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      _that.$jsonp(url, {
        ak: KEY,
        address: res,
        output: 'json'
      })
        .then(json => {
          console.log(json.result.location)
          _that.$http
            .post(_that.$api + '/api/map/get_rate', json.result.location)
            .then(rs => {
              _that._data.registerform.area_id = rs.data.area_id
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
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
    'van-row': Row

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}
.boxss .input {
  text-align: left;
}
h3 {
  text-align: center;
  background: #ffda44;
  margin: 0;
  line-height: 50px;
}
.boxss {
  padding: 10px 15px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
}
.ice_tel {
  color: #323233;
  font-size: 14px;
  line-height: 24px;
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
.van-field__control {
  text-align: right;
}
.van-tab__pane {
  margin-top: 10px;
}

/* .floatbox {
  width: 40%;
  float: left;
} */

.van-cell__value {
  width: 60%;
  text-align: right;
}
h4 {
  text-indent: 2em;
  background: #c8c9cc;
  line-height: 50px;
  font-size: 20px;
  margin: 0;
}
.van-field__label {
  width: 117px;
}
</style>
