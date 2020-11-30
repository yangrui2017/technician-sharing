<template>

  <div class="box">
    <h3>添加加盟店</h3>
    <van-tabs color="#ff976a">

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
        <van-field v-model="company.store_name"
                   label="加盟店名称"
                   placeholder="请输入名称" />
        <van-field v-model="company.address"
                   label="加盟店地址"
                   placeholder="请输入地址" />
        <van-field v-model="company.ptnr_rate_req"
                   label="管理费率"
                   placeholder="请输入数值（0.1）" />

        <van-cell title="是否代发劳务费"
                  class="other">
          <van-radio-group v-model="company.to_pay_req">
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
                    color="#7232dd"
                    @click="register(company)">确定</van-button>
      </div>
    </van-tabs>

  </div>
</template>

<script>
import { Area, Field, Popup, RadioGroup, Radio, Cell, CellGroup, Picker, Button, Toast, Col, Row, Tab, Tabs, Checkbox, CheckboxGroup } from 'vant'
import { setTimeout } from 'timers'
import Exif from 'exif-js'
import pice from '../../assets/pice.png'
var url = require('../worker/url.js')
export default {

  data () {
    return {
      degree: '',
      showArea: false,
      license: pice,
      companycity: '',
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
      },
      showPicker: false,
      company: {
        "partner_unionid": "",
        "city": "",
        "area": "",
        "address": "",
        "is_active": 1,
        "store_pic": "",
        "store_loc": "",
        "area_id": 0,
        "store_name": "",
        "to_pay_req": "1",
        "ptnr_rate_req": ""
      }

    }
  },
  mounted () {
    var _that = this

  },
  methods: {
    onConfirm2 (values) {
      var _that = this
      _that._data.companycity = values.map((item) => item.name).join('/')
      _that._data.company.city = values[1].name
      _that._data.company.area = values[2].name
      _that.showArea = false
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    register () {

      var _that = this;
      if (_that._data.companycity == '') {
        Toast('请选择服务区域')
      } else if (_that._data.company.address == '') {
        Toast('请选择现住址')
      } else {
        _that.addresstranslation(_that._data.company.address);


        _that._data.company.partner_unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid

      }
    },
    addresstranslation (res) {
      Toast('请稍等！')
      var _that = this
      let url = ' https://api.map.baidu.com/geocoding/v3/?ak=7hhI8dTWwLRQ8KLTWqi8kOoLUhClNDxS&output=json&address=' + res
      _that.$jsonp(url)
        .then(json => {
          if (json.status == "1") {
            Toast('请填写详细地址')
          } else {
            _that._data.company.store_loc = JSON.stringify(json.result.location);
            _that.$http
              .post(_that.$api + '/api/map/get_rate', json.result.location)
              .then(rs => {
                _that._data.company.area_id = rs.data.area_id

                console.log(_that._data.company)
                _that.$http
                  .post(_that.$api + '/wx/ptnr/update_store', _that._data.company)
                  .then(rs => {
                    Toast('已添加加盟店信息，请等待审核通过！')
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              .catch(err => {
                console.log(err)
              })
          }

        })
        .catch(err => {
          console.log(err)
        })
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
          _that._data.company.store_pic = rs.data.img_url

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
* {
  text-align: left;
}

h3 {
  height: 50px;
  margin: 0;
  text-align: center;
  line-height: 50px;
  color: white;
  background: rgb(41, 89, 233);
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
  width: 50%;
  margin-left: 19%;
  text-align: center;
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
  margin-left: 10%;
}
.van-button--normal {
  width: 70%;
  margin-top: 20px;
  margin-left: 15%;
  text-align: center;
  margin-bottom: 20px;
}
</style>
