<template>
  <div class="boxs">

    <div id="map"
         class="map"
         :style="{height:heights}"></div>
  </div>
</template>

<script>
// import mapdetail from "@/assets/map"

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
  mounted () {
    var _that = this
    this.$http.get('https://wx.upctech.com.cn/api/map/map_data').then(res => {
      this.mapdetail = res.data
      console.log('shujv', this.mapdetail)
      this.Zmap()
    })
  },
  methods: {
    ceshi () {
      this.flag = false
    },
    Zmap () {
      var onoff2 = true
      let zmap = this
      var zMap = this
      this.map = new BMap.Map('map') // 创建地图实例
      // console.log('....',this.map)
      var point = new BMap.Point(121.481976, 31.226871) // 创建点坐标
      this.map.centerAndZoom(point, 13) // 初始化地图，设置中心点坐标和地图级别

      var marker = new BMap.Marker(new BMap.Point(121.481976, 31.226871)) // 创建标注
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
          { strokeColor: 'black', strokeWeight: 1, strokeOpacity: 0.5 }
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
          { strokeColor: 'black', strokeWeight: 1, strokeOpacity: 0.5 }
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
          polygon.setFillColor('green')

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
          polygon.setFillColor('blue')

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
</style>
