<template>
  <div class="boxs">
    <div class="promptbox">
      <div class="promptlist">
        <div class="promptcolor color1"></div>
        <div class="prompttext">已开通</div>
      </div>
      <div class="promptlist">
        <div class="promptcolor color2"></div>
        <div class="prompttext">待开通</div>
      </div>
      <div class="promptlist">
        <div class="promptcolor color3"></div>
        <div class="prompttext">区域满额<span>(此区域技师已满员)</span></div>
      </div>

    </div>
    <div id="map"
         class="map"></div>
  </div>
</template>

<script>
import redflag from '../assets/redflag.png'
export default {
  name: 'maps',
  data () {
    return {
      onoff: '',
      heights: document.documentElement.clientHeight - 61 + 'px',
      list: [],
      level: 13, // 地图级别
      initCenter: new BMap.Point(121.3056, 31.204803),
      map: null,
      xgrids: [], // 经线
      ygrids: [], // 纬线
      beSelectBounds: {},
      bounds: null, // 当前地图的四个顶点
      span: null, // 当前网格的跨度
      mapAyy: [],
      flag: false,
      mapsd: {},
      mapdetail: '',
      address_detail: '', // 详细地址
      userlocation: { lng: '', lat: '' }
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
            _that.$http.post('https://xcx.upctech.com.cn/api/register/getAddressByUnionid', {
              'access_key': 'xunjiepf',
              'unionid': response.data.userData.unionid
            }).then(res => {
              var points = _that.qqMapTransBMap(res.data.address_latitude, res.data.address_longitude)

              _that.Zmap(points.lat, points.lng)
            })
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
            window.location.replace(link)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  mounted () {
    var _that = this
    this.$http.get('https://wx.upctech.com.cn/api/map/map_data').then(res => {
      this.mapdetail = res.data
      console.log('shujv', this.mapdetail)
    })
  },
  methods: {
    // 微信sdk
    wxInit (res) {
      var _that = this
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ['getLocation']
      })
      wx.checkJsApi({
        jsApiList: ['getLocation'],
        success: function (res) {
          if (res.checkResult.getLocation == false) {
            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！')
          }
        }
      })

      // 微信分享失败
      wx.error(function (err) {
        alert(JSON.stringify(err))
      })
      // 微信分享成功
      wx.ready(function () {
        alert('fenxiangchenggong ')
        wx.getLocation({
          success: function (res) {
            var points = _that.qqMapTransBMap(res.latitude, res.longitude)

            _that.Zmap(points.lat, points.lng)
            // var points2 = _that.qqMapTransBMap2(res.latitude, res.longitude)
            // console.log(pointss)
          },
          cancel: function (res) {
            alert('用户拒绝授权获取地理位置')
          }
        })
      })
    },

    qqMapTransBMap2 (lat, lng) {
      var _that = this
      _that.$http.get('https://api.map.baidu.com/reverse_geocoding/v2/?ak=7hhI8dTWwLRQ8KLTWqi8kOoLUhClNDxS&output=json&coordtype=wgs84ll&location=' + lat + ',' + lng)
        .then(function (response) {
          console.log(response)
        })
    },
    qqMapTransBMap (lat, lng) {
      let x_pi = 3.14159265358979324 * 3000.0 / 180.0

      let x = lng

      let y = lat

      let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)

      let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)

      let lngs = z * Math.cos(theta) + 0.0065

      let lats = z * Math.sin(theta) + 0.006

      return {

        lng: lngs,

        lat: lats
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    Zmap (lat, lng) {
      var onoff2 = true
      let zmap = this
      var zMap = this
      this.map = new BMap.Map('map') // 创建地图实例
      var point = new BMap.Point(lng, lat) // 创建点坐标
      this.map.centerAndZoom(point, 12) // 初始化地图，设置中心点坐标和地图级别
      var myIcon = new BMap.Icon(redflag, new BMap.Size(25, 25))
      var marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: myIcon })
      // var marker = new BMap.Marker() // 创建标注
      this.map.addOverlay(marker)
      this.map.enableScrollWheelZoom(true)

      // 已开通区域

      this.initProperty()
      this.initGrid()

      // 添加移动后的点击事件
      this.map.addEventListener('dragend', function () {
        zmap.initProperty()
        zmap.initGrid()
      })
      // 添加放大或缩小时的事件

      this.map.addEventListener('zoomend', function () {
        var ZoomNum = zmap.map.getZoom()
        console.log(ZoomNum)
        if (ZoomNum < 13) {
          onoff2 = false
        } else {
          onoff2 = true
        }
        var string = JSON.stringify(zmap.mapAyy)
        zmap.initProperty()
        zmap.initGrid()
      })
      function setPlace () {
        // zmap.map.clearOverlays();    //清除地图上所有覆盖物

      }
    },
    initProperty: function () {
      // 初始化当前地图的状态
      this.level = this.map.getZoom()
      // console.log("map",this.map.getBounds().getSouthWest())
      this.bounds = {
        x1: this.map.getBounds().getSouthWest().lng,
        y1: this.map.getBounds().getSouthWest().lat,
        x2: this.map.getBounds().getNorthEast().lng,
        y2: this.map.getBounds().getNorthEast().lat
      }
      console.log(this.bounds)
      // console.log("boundes",this.bounds)
      this.span = this.getSpan() // 需要使用level属性
    },
    initGrid: function () {
      // 初始化网格
      var zMap = this
      // 将原来的网格线先去掉
      for (var i in zMap.xgrids) {
        this.map.removeOverlay(zMap.xgrids[i])
      }
      zMap.xgrids = []
      for (var i in zMap.ygrids) {
        this.map.removeOverlay(zMap.ygrids[i])
      }
      zMap.ygrids = []
      // 获取当前网格跨度
      var span = zMap.span
      // 初始化地图上的网格
      // console.log("网格数据",zMap.bounds.x1)
      // console.log("zMap.initCenter",span)
      // 开通区域
      // var adbbsa = zMap.getMaxMinLongitudeLatitude(121.481976, 31.226871, 6);
      // console.log(adbbsa);
      zMap.mover()
      for (
        var i =
          zMap.bounds.x1 +
          ((zMap.initCenter.lng - zMap.bounds.x1) % span.x) -
          span.x;
        i < zMap.bounds.x2 + span.x;
        i += span.x
      ) {
        var polyline = new BMap.Polyline(
          [
            new BMap.Point(i.toFixed(6), zMap.bounds.y1),
            new BMap.Point(i.toFixed(6), zMap.bounds.y2)
          ],
          { strokeColor: 'black', strokeWeight: 1, strokeOpacity: 0.8, strokeStyle: 'dashed' }
        )
        zMap.xgrids.push(polyline)
        zMap.map.addOverlay(polyline)
      }
      for (
        var i =
          zMap.bounds.y1 +
          ((zMap.initCenter.lat - zMap.bounds.y1) % span.y) -
          span.y;
        i < zMap.bounds.y2 + span.y;
        i += span.y
      ) {
        var polyline = new BMap.Polyline(
          [
            new BMap.Point(zMap.bounds.x1, i.toFixed(6)),
            new BMap.Point(zMap.bounds.x2, i.toFixed(6))
          ],
          { strokeColor: 'black', strokeWeight: 1, strokeOpacity: 0.8, strokeStyle: 'dashed' }
        )
        zMap.ygrids.push(polyline)
        zMap.map.addOverlay(polyline)
      }

      console.log('网格数据', zMap.ygrids)
    },
    getSpan: function () {
      // 获取网格的跨度
      var scale = 0.75
      // var x = 0.00064;
      // for (var i = this.level; i < 19; i++) {
      //     x *= 2;
      // }
      //  var y = parseFloat((scale * x).toFixed(6));
      //  console.log(x,y)
      var x = 0.0524
      var y = 0.04492
      // var y = 0.05395;
      // var x = 0.0630974;
      return { x: x, y: y }
    },
    getGrid: function (point) {
      // 返回当前点在所在区块的四个顶点
      var zMap = this
      // 先找出两条纵线坐标
      var xpoints = this.xgrids
        .map(function (polyline) {
          return polyline.getPath()[0].lng
        })
        .filter(function (lng) {
          return Math.abs(lng - point.lng) <= zMap.span.x
        })
        .sort(function (a, b) {
          return a - b
        })
        .slice(0, 2)

      // 再找出两条横线的坐标
      var ypoints = this.ygrids
        .map(function (polyline) {
          return polyline.getPath()[0].lat
        })
        .filter(function (lat) {
          return Math.abs(lat - point.lat) <= zMap.span.y
        })
        .sort(function (a, b) {
          return a - b
        })
        .slice(0, 2)

      //	this.map.centerAndZoom(new BMap.Point(xpoints[0], ypoints[0]), zMap.level);
      // console.log("00011总",new BMap.Point(xpoints[0], ypoints[0]))
      // console.log("00011",new BMap.Point(xpoints[0]+0.0262, ypoints[0]+0.02246))
      return [
        new BMap.Point(xpoints[0], ypoints[0]),
        new BMap.Point(xpoints[0], ypoints[1]),
        new BMap.Point(xpoints[1], ypoints[1]),
        new BMap.Point(xpoints[1], ypoints[0])
      ]
    },
    reset: function () {
      // 重置
      this.map.reset()
    },

    ZPoint: function (x, y, code) {
      this.code = code
      this.point = new BMap.Point(x, y)
    },
    mover () {
      // 已开通区域
      var zMap = this
      for (var i = 1; i < zMap.mapdetail.length; i++) {
        if (zMap.mapdetail[i].is_active === 1) {
          console.log(zMap.mapdetail[i])
          var points = [
            new BMap.Point(
              zMap.mapdetail[i].locations.ld.lng,
              zMap.mapdetail[i].locations.ld.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.lt.lng,
              zMap.mapdetail[i].locations.lt.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.rt.lng,
              zMap.mapdetail[i].locations.rt.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.rd.lng,
              zMap.mapdetail[i].locations.rd.lat
            )
          ]
          var key =
            '' + points[0].lng + points[0].lat + points[2].lng + points[2].lat // 使用两个点的坐标作为key
          var polygon = new BMap.Polygon(points, {
            strokeColor: 'red',
            strokeWeight: 2,
            strokeOpacity: 0.5
          })
          polygon.setFillColor('#e3f2e3')

          zMap.map.addOverlay(polygon)
          zMap.beSelectBounds[key] = polygon
        }
        if (zMap.mapdetail[i].is_active == 2) {
          var points = [
            new BMap.Point(
              zMap.mapdetail[i].locations.ld.lng,
              zMap.mapdetail[i].locations.ld.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.lt.lng,
              zMap.mapdetail[i].locations.lt.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.rt.lng,
              zMap.mapdetail[i].locations.rt.lat
            ),
            new BMap.Point(
              zMap.mapdetail[i].locations.rd.lng,
              zMap.mapdetail[i].locations.rd.lat
            )
          ]
          var key =
            '' + points[0].lng + points[0].lat + points[2].lng + points[2].lat // 使用两个点的坐标作为key
          var polygon = new BMap.Polygon(points, {
            strokeColor: 'red',
            strokeWeight: 2,
            strokeOpacity: 0.5
          })
          polygon.setFillColor('#e0e0ec')

          zMap.map.addOverlay(polygon)
          zMap.beSelectBounds[key] = polygon
        }
      }
    },
    qvxiao () {
      this.flag = false
    }
  }
}
</script>

<style scoped>
.boxs {
  height: 100%;
}
.promptbox {
  width: 60%;
  height: 100px;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
}
.promptlist {
  width: 100%;
  height: 25px;
}
.promptcolor {
  float: left;
  margin-top: 4px;
  width: 10%;
  height: 14px;
  border-radius: 25%;
}
.color1 {
  background: #e3f2e3;
}
.color2 {
  background: #e0e0ec;
}
.color3 {
  background: #f1c3c3;
}
.color4 {
  background: #ecca35;
}
.prompttext {
  font-weight: 600;
  width: 90%;
  text-align: left;
  line-height: 25px;
  font-size: 14px;
  float: left;
}

.map {
  width: 100%;
  height: 750px;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  margin: 0;
  font-family: "微软雅黑";
}
.from {
  width: 50%;
  position: absolute;
  margin: 60px auto;

  left: 0;
  right: 0;
  z-index: 10;
  background: white;
}
.prompttext span {
  font-size: 12px;
}
</style>
