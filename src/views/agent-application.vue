<template>

  <div class="box">
    <h3>代理申请</h3>
    <van-tabs color="#ff976a">
      <van-tab title="个人">
        <van-cell-group>
          <van-field readonly
                     clickable
                     name="area"
                     :value="personalcity"
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
          <van-row>
            <van-col span="7">
              <div class="service">服务场所</div>
            </van-col>
            <van-col span="16">
              <van-checkbox-group v-model="personal.agent_loc"
                                  direction="horizontal">
                <van-checkbox name="本人经营管理的饭店"
                              checked-color="#07c160">
                  <div class="servicetext">本人经营管理的饭店</div>
                </van-checkbox>
                <van-checkbox name="本人经营管理的小店铺"
                              checked-color="#07c160">
                  <div class="servicetext">本人经营管理的小店铺</div>
                </van-checkbox>
                <van-checkbox name="本人居住的小区及附近区域停车场"
                              checked-color="#07c160">
                  <div class="servicetext">本人居住的小区及附近区域停车场</div>
                </van-checkbox>
                <van-checkbox name="本人的微信朋友圈"
                              checked-color="#07c160">
                  <div class="servicetext">本人的微信朋友圈</div>
                </van-checkbox>
              </van-checkbox-group>
            </van-col>
          </van-row>

          <van-field v-model="personal.name"
                     required
                     label="个人姓名"
                     placeholder="请输入姓名" />
          <van-field v-model="personal.person_id"
                     required
                     label="身份证号"
                     type="tel"
                     placeholder="请输入身份证号" />
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
                     label="短信验证码"
                     type="tel"
                     placeholder="请输入短信验证码">
            <van-button slot="button"
                        size="small"
                        type="warning"
                        @click="verifications('personal')">点击验证</van-button>
          </van-field>

          <van-field readonly
                     clickable
                     name="picker"
                     :value="personal.education"
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
            <van-radio-group v-model="personal.have_job">
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
                    to="/agent-idcard"
                    @click="bindidcard()" />
          <van-field v-model="personal.address"
                     label="现住址"
                     placeholder="请输入您的地址" />

        </van-cell-group>
        <van-button round
                    type="warning"
                    size="normal"
                    @click="postfrom(personal)">注册代理</van-button>
      </van-tab>
      <van-tab title="公司">
        <van-cell-group>
          <van-field readonly
                     clickable
                     name="area"
                     :value="companycity"
                     label="服务区域"
                     input-align="right"
                     placeholder="点击选择省市区"
                     @click="showArea = true" />
          <van-popup v-model="showArea"
                     position="bottom">
            <van-area :area-list="areaList"
                      @confirm="onConfirm2"
                      @cancel="showArea = false" />
          </van-popup>
          <van-row>
            <van-col span="7">
              <div class="service">服务场所</div>
            </van-col>
            <van-col span="16">
              <van-checkbox-group v-model="company.agent_loc"
                                  direction="horizontal">
                <van-checkbox name="本公司经营管理的饭店"
                              checked-color="#07c160">
                  <div class="servicetext">本公司经营管理的饭店</div>
                </van-checkbox>
                <van-checkbox name="本公司经营管理的商铺"
                              checked-color="#07c160">
                  <div class="servicetext">本公司经营管理的商铺</div>
                </van-checkbox>
                <van-checkbox name="本（物业）公司经营管理的小区"
                              checked-color="#07c160">
                  <div class="servicetext">本（物业）公司经营管理的小区</div>
                </van-checkbox>
                <van-checkbox name="本公司经营的网店"
                              checked-color="#07c160">
                  <div class="servicetext">本公司经营的网店</div>
                </van-checkbox>
              </van-checkbox-group>
            </van-col>
          </van-row>
          <van-field v-model="company.company_name"
                     required
                     label="企业名称"
                     placeholder="请输入企业名称" />
          <van-field v-model="company.address"
                     required
                     label="办公地址"
                     placeholder="请输入地址" />
          <van-field v-model="company.contact_phone"
                     required
                     label="固定电话"
                     type="tel"
                     placeholder="请输入电话" />

          <van-field v-model="company.company_id"
                     required
                     label="统一信用代码"
                     type="tel"
                     placeholder="请输入统一信用代码" />
          <van-field v-model="company.bank_name"
                     required
                     label="开户行"
                     placeholder="请输入开户行" />
          <van-field v-model="company.bank_account"
                     required
                     label="账号"
                     type="tel"
                     placeholder="请输入您的账号" />
          <van-field v-model="company.name"
                     required
                     label="联络人"
                     placeholder="请输入联络人姓名" />
          <van-field v-model="company.phone"
                     center
                     clearable
                     required
                     label="手机号码"
                     type="tel"
                     placeholder="请输入手机号码">
            <van-button slot="button"
                        size="small"
                        type="warning"
                        @click="phoneverification('company')">发送验证码</van-button>
          </van-field>
          <van-field v-model="comverification"
                     center
                     clearable
                     required
                     label="短信验证码"
                     type="tel"
                     placeholder="请输入短信验证码">
            <van-button slot="button"
                        size="small"
                        type="warning"
                        @click="verifications('company')">点击验证</van-button>
          </van-field>
          <img :src="license"
               class="imgurl2" />
          <a href="javascript:;"
             class="file">提交营业执照照片
            <input type="file"
                   @change="upload3"
                   accept="image/*" />
          </a>

        </van-cell-group>
        <div class="button">
          <van-button round
                      type="warning"
                      size="normal"
                      @click="register(company)">注册代理</van-button>
        </div>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { Area, Field, Popup, RadioGroup, Radio, Cell, CellGroup, Picker, Button, Toast, Col, Row, Tab, Tabs, Checkbox, CheckboxGroup } from 'vant'
import { setTimeout } from 'timers'
import agenttitle from '../components/agent-title'
import md5 from 'js-md5'
import Exif from 'exif-js'
import pice from '../assets/pice.png'
var url = require('./worker/url.js')
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
      columns: ['本科', '大专', '高中及以下', '初中', '小学'],
      showArea: false,
      perverification: '',
      comverification: '',
      vcode: '',
      personal: {
        unionid: '',
        agent_type: 'personal',
        agent_loc: [],
        name: '',
        city: '',
        area: '',
        person_id: '',
        phone: '',
        idcard1: '',
        idcard2: '',
        holdcard: '',
        have_job: '0',
        education: '',
        address: ''

      },
      company: {
        agent_loc: [],
        company_id: '',
        agent_type: 'company',
        company_name: '',
        city: '',
        companyid_pic: '',
        contact_phone: '',
        bank_name: '',
        bank_account: ''
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
    onConfirm2 (values) {
      var _that = this
      _that._data.companycity = values.map((item) => item.name).join('/')
      _that._data.company.city = values[1].name
      _that._data.company.area = values[2].name
      _that.showArea = false
    },
    phoneverification (value) {
      var _that = this
      var phone = ''
      if (value == 'personal') {
        phone = _that._data.personal.phone
      } else {
        phone = _that._data.company.phone
      }
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
      if (value == 'personal') {
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
      } else {
        if (_that._data.comverification != '') {
          var md5text = _that._data.comverification + 'send'
          md5text = md5(md5text)
          if (md5text == _that._data.vcode) {
            Toast('验证成功')
            _that._data.comtelonoff = true
            _that._data.comverification = '已验证*****'
          } else {
            Toast('验证失败,请重新发送验证码')
          }
        } else {
          Toast('号码不能为空')
        }
      }
    },
    // 个人注册
    postfrom () {
      var _that = this
      if (_that._data.pertelonoff == 'false') {
        Toast('手机验证未通过')
      } else if (_that._data.personal.province == '') {
        Toast('请选择服务区域')
      } else if (_that._data.personal.education == '') {
        Toast('请选择文化程度')
      } else if (_that._data.personal.address == '') {
        Toast('请选择现住址')
      } else if (_that._data.degree == '') {
        Toast('请上传身份证')
      } else {
        _that._data.personal.unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
        _that._data.personal.idcard1 = JSON.parse(sessionStorage.getItem('imagefrom')).idcard1
        _that._data.personal.idcard2 = JSON.parse(sessionStorage.getItem('imagefrom')).idcard2
        _that._data.personal.holdcard = JSON.parse(sessionStorage.getItem('imagefrom')).holdcard
        if (sessionStorage.getItem('agentmessage')) {
          _that._data.personal.id = JSON.parse(sessionStorage.getItem('agentmessage')).id
        }
        _that._data.personal.is_active = 1
        console.log(_that._data.personal)
        _that.$http
          .post(_that.$api + '/wx/agent/create', _that._data.personal)
          .then(rs => {
            Toast('正在审核，请稍后')
            console.log(rs)
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
    // 公司注册
    register () {
      var _that = this
      if (_that._data.comtelonoff == 'false') {
        Toast('手机验证未通过')
      } else if (_that._data.company.province == '') {
        Toast('请选择服务区域')
      } else if (_that._data.company.address == '') {
        Toast('请填写办公地址')
      } else if (_that._data.company.companyid_pic == '') {
        Toast('请上传营业执照')
      } else {
        _that._data.company.unionid = JSON.parse(localStorage.getItem('userinfo')).userData.unionid
        if (sessionStorage.getItem('agentmessage')) {
          _that._data.company.id = JSON.parse(sessionStorage.getItem('agentmessage')).id
        }
        _that._data.company.is_active = 1
        _that.$http
          .post(_that.$api + '/wx/agent/create', _that._data.company)
          .then(rs => {
            Toast('正在审核，请稍后')
            _that.$router.push({
              path: '/agent-examine'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    upload3 (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.imgPreview(files[0])
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self._data.license = this.result
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self._data.license = data
            }
            self.postImg()
          }
        }
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    postImg () {
      var imgage
      var _that = this
      imgage = _that.convertBase64UrlToBlob(_that._data.license, '0')

      // 传递一个 FormData 对象 即可
      let formData = new FormData()
      formData.append('image', imgage) // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      _that.$http
        .post(_that.$api + '/wx/img/image/upload/', formData)
        .then(rs => {
          // _that._data.license = rs.data.img_url
          _that._data.company.companyid_pic = rs.data.img_url

          Toast('上传成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    convertBase64UrlToBlob (urlData, type) { /* 将base64转换成可用formdata提交的文件,urlData base64的url,type 0图片 1视频 */
      var bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: type == 0 ? 'image/png' : 'image/mp4' })
    }

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
  background: #f34230;
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
