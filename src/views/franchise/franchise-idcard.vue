<template>
  <div class="operate">
    <h3>上传身份证</h3>
    <div class="imgbox">
      <img :src="headerImage"
           class="img" />
      <a href="javascript:;"
         class="file">上传身份证正面照片
        <input type="file"
               @change="upload"
               accept="image/*" />
      </a>
    </div>
    <div class="imgbox">
      <img :src="headerImage2"
           class="img" />
      <a href="javascript:;"
         class="file">上传身份证反面（国徽面）照片
        <input type="file"
               @change="upload2"
               accept="image/*" />
      </a>
    </div>
    <div class="imgbox">
      <img :src="headerImage3"
           class="img" />
      <a href="javascript:;"
         class="file">上传手持身份证照片
        <input type="file"
               @change="upload3"
               accept="image/*" />
      </a>
    </div>
    <div class="next">
      <van-button type="primary"
                  size="large"
                  color="#ffda44"
                  @click="register()">下一步</van-button>
    </div>
  </div>
</template>
<script>
import { NavBar, Button, Toast } from 'vant'
import Exif from 'exif-js'
import pice from '../../assets/pice.png'
var url = require('../worker/url.js')
export default {
  data () {
    return {
      imagefrom: {
        idcard1: '',
        idcard2: '',
        holdcard: ''
      },
      headerImage: pice,
      headerImage2: pice,
      headerImage3: pice,
      picValue: ''
    }
  },
  mounted () {
    var _that = this
    var imagefrom = JSON.parse(sessionStorage.getItem('imagefrom'))

    if (imagefrom) {
      _that._data.imagefrom = imagefrom
      _that._data.headerImage = _that._data.imagefrom.idcard1
      _that._data.headerImage2 = _that._data.imagefrom.idcard2
      _that._data.headerImage3 = _that._data.imagefrom.holdcard
    }
  },
  components: {
    'van-nav-bar': NavBar,
    'van-button': Button
  },
  methods: {
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.imgPreview(files[0], '1')
    },
    upload2 (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.imgPreview(files[0], '0')
    },
    upload3 (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.imgPreview(files[0], '2')
    },
    register () {
      var _that = this
      console.log(_that._data.imagefrom)
      if (_that._data.imagefrom.idcard1 != '' && _that._data.imagefrom.idcard2 != '' && _that._data.imagefrom.holdcard != '') {
        sessionStorage.setItem('franchiseimage', JSON.stringify(_that._data.imagefrom))
        _that.$router.push({
          path: '/franchise-application?degree=ok'
        })
      } else {
        Toast('请上传所需身份证照片')
      }
    },
    imgPreview (file, index) {
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
            if (index == '1') {
              self.headerImage = this.result
            } else if (index == '0') {
              self.headerImage2 = this.result
            } if (index == '2') {
              self.headerImage3 = this.result
            }
            self.postImg(index)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              if (index == '1') {
                self.headerImage = data
              } if (index == '0') {
                self.headerImage2 = data
              } if (index == '2') {
                self.headerImage3 = data
              }
              self.postImg(index)
            }
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
    postImg (index) {
      var imgage
      var _that = this
      if (index == '1') {
        imgage = _that.convertBase64UrlToBlob(_that.headerImage, '0')
      } if (index == '0') {
        imgage = _that.convertBase64UrlToBlob(_that.headerImage2, '0')
      }
      if (index == '2') {
        imgage = _that.convertBase64UrlToBlob(_that.headerImage3, '0')
      }
      // 传递一个 FormData 对象 即可
      let formData = new FormData()
      formData.append('image', imgage) // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post(_that.$api + '/wx/img/image/upload/', formData)
        .then(rs => {
          if (index == '1') {
            Toast('上传身份证正面照片成功')
            _that._data.imagefrom.idcard1 = rs.data.img_url
          } if (index == '0') {
            Toast('上传身份证反面照片成功')
            _that._data.imagefrom.idcard2 = rs.data.img_url
          }
          if (index == '2') {
            Toast('上传手持身份证照片成功')
            _that._data.imagefrom.holdcard = rs.data.img_url
          }
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

  }
}
</script>
<style>
h3 {
  width: 100%;
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
}
.img {
  width: 90%;
  max-height: 300px;
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
  line-height: 32px;
  width: 80%;
}
.imgbox {
  margin-top: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.next {
  margin-top: 20px;
}
</style>
