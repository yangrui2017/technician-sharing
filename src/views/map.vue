<template>
  <div class="boxs">
    <el-form label-width="80px" :ref="mapsd" :model="mapsd" v-show="flag" class="from">
      <el-form-item label="区域ID">
        <el-input :model="mapsd.region_id"></el-input>
      </el-form-item>
      <el-form-item label="技师人数">
        <el-input :model="mapsd.w_count"></el-input>
      </el-form-item>

      <el-form-item label="会员人数">
        <el-input :model="mapsd.j_count"></el-input>
      </el-form-item>
      <el-form-item label="是否开通">
        <el-switch :model=true active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fromtext">更新</el-button>
        <el-button @click="qvxiao">取消</el-button>
      </el-form-item>
    </el-form>
    <div id="map" class="map" :style="{height:heights}"></div>
  </div>
</template>

<script>
// import mapdetail from "@/assets/map"

export default {
  name: "maps",
  data() {
    return {
      heights: document.documentElement.clientHeight+ "px",
      list: [],
      level: 13, //地图级别
      initCenter: new BMap.Point(121.3056, 31.204803),
      map: null,
      xgrids: [], //经线
      ygrids: [], //纬线
      beSelectBounds: {},
      bounds: null, //当前地图的四个顶点
      span: null, //当前网格的跨度
      mapAyy: [],
      flag: false,
      mapsd: {},
      mapdetail: "",
      address_detail: "", //详细地址
      userlocation: { lng: "", lat: "" }
    };
  },
  mounted() {
      var _that=this;
   _that.$http.get("http://dev.upctech.com.cn/api/map/get_active_area").then(function(response) {
           
               _that.mapdetail =  response.data.active_area;
      console.log("shujv",_that.mapdetail);

      _that.Zmap();
          })
  },
  methods: {
    Zmap() {
      var onoff2 = true;
      let zmap = this;
      var zMap = this;
      this.map = new BMap.Map("map"); // 创建地图实例
      // console.log('....',this.map)
      var point = new BMap.Point(121.481976, 31.226871); // 创建点坐标
      this.map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别

      var marker = new BMap.Marker(new BMap.Point(121.481976, 31.226871)); // 创建标注
      this.map.addOverlay(marker);
      this.map.enableScrollWheelZoom(true);
      for (let i = 0; i < zmap.mapdetail.length; i++) {
        var opts = {
          position: new BMap.Point(
            zmap.mapdetail[i].locations.cen.lng,
            zmap.mapdetail[i].locations.cen.lat
          ), // 指定文本标注所在的地理位置
          offset: new BMap.Size(-50, 0) //设置文本偏移量
        };
        var label = new BMap.Label(
          zmap.mapdetail[i].id ,
          opts
        ); // 创建文本标注对象
        label.setStyle({
          color: "red",
          fontSize: "12px",
          height: "20px",
          lineHeight: "20px",
          fontFamily: "微软雅黑",
          width: "120px",
          display: "none"
        });
        zMap.map.addOverlay(label);
        label.addEventListener("click", function() {
          // map.openInfoWindow(infoWindow,point);   //提示信息
          zmap.$http
            .post("http://dev.upctech.com.cn/api/map/get_w_j_count", {
              region_id: zmap.mapdetail[i].id
            })
            .then(res => {
              zmap.mapsd = res.data;
              console.log(zmap.mapsd.active)
              zmap.flag = true;
            });
        });
      }

      this.mover();
      this.initProperty();
      this.initGrid();

      //添加移动后的点击事件
      this.map.addEventListener("dragend", function() {
        zmap.initProperty();
        zmap.initGrid();
      });
      //添加放大或缩小时的事件

      this.map.addEventListener("zoomend", function() {
        var ZoomNum = zmap.map.getZoom();
        console.log(ZoomNum);
        if (ZoomNum < 13) {
          onoff2 = false;
        } else {
          onoff2 = true;
        }
        var string = JSON.stringify(zmap.mapAyy);
        // console.log('string',string)
        // console.log("数据",zmap.mapAyy)
        zmap.initProperty();
        zmap.initGrid();
        
      });
      //设置点击事件
      // this.map.addEventListener("click", function(e) {
      //   //zmap.mapsd = zmap.mapdetail[i];
      //   //zmap.flag = true;
      //   var lat = e.point.lat;
      //   var lng = e.point.lng;
      //   var point = { lat: lat, lng: lng };
      //   //获取当前点是在哪个区块内,获取正方形的四个顶点
      //   var points = zmap.getGrid(point);
      //   console.log(points);
      //   // console.log("0000",points)
      //   //判断当前区域是否已经被选中过，如果被选中过则取消选中
      //   var key =
      //     "" + points[0].lng + points[0].lat + points[2].lng + points[2].lat; //使用两个点的坐标作为key
      //   if (zmap.beSelectBounds[key]) {
      //     this.map.removeOverlay(zmap.beSelectBounds[key]);
      //     delete zmap.beSelectBounds[key];
      //     return;
      //   }
      //   var polygon = new BMap.Polygon(points, {
      //     strokeColor: "red",
      //     strokeWeight: 2,
      //     strokeOpacity: 0.5
      //   });
      //   polygon.setFillColor("red");
      //   zmap.map.addOverlay(polygon);
      //   zmap.beSelectBounds[key] = polygon;
      // });

      // var ac = new BMap.Autocomplete({
      //   //建立一个自动完成的对象
      //   input: "suggestId",
      //   location: zmap.map
      // });
      // var myValue;
      // ac.addEventListener("onconfirm", function(e) {
      //   //鼠标点击下拉列表后的事件
      //   var _value = e.item.value;
      //   myValue =
      //     _value.province +
      //     _value.city +
      //     _value.district +
      //     _value.street +
      //     _value.business;
      //   zmap.address_detail = myValue;

      //   setPlace();
      // });

      function setPlace() {
        // zmap.map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
          zmap.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          console.log("poi", zmap.userlocation);
          zmap.map.centerAndZoom(zmap.userlocation, 13);
          var myIcon = new BMap.Icon(
            require("../assets/marker.png"),
            new BMap.Size(22, 32)
          );
          zmap.map.addOverlay(
            new BMap.Marker(zmap.userlocation, { icon: myIcon })
          ); //添加标注
        }

        // var local = new BMap.LocalSearch(zmap.map, {
        //   //智能搜索
        //   onSearchComplete: myFun
        // });
        // local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        // zmap.map.addEventListener("click",function(e){
        //   //经度
        //   console.log(zmap.userlocation.lng);
        //   //维度
        //   console.log(zmap.userlocation.lat);
        //
        // })
      }
    },
    initProperty: function() {
      //初始化当前地图的状态
      this.level = this.map.getZoom();
      // console.log("map",this.map.getBounds().getSouthWest())
      this.bounds = {
        x1: this.map.getBounds().getSouthWest().lng,
        y1: this.map.getBounds().getSouthWest().lat,
        x2: this.map.getBounds().getNorthEast().lng,
        y2: this.map.getBounds().getNorthEast().lat
      };
      // console.log("boundes",this.bounds)
      this.span = this.getSpan(); //需要使用level属性
    },
    initGrid: function() {
      //初始化网格
      var zMap = this;
      //将原来的网格线先去掉
      for (var i in zMap.xgrids) {
        this.map.removeOverlay(zMap.xgrids[i]);
      }
      zMap.xgrids = [];
      for (var i in zMap.ygrids) {
        this.map.removeOverlay(zMap.ygrids[i]);
      }
      zMap.ygrids = [];
      //获取当前网格跨度
      var span = zMap.span;
      //初始化地图上的网格
      // console.log("网格数据",zMap.bounds.x1)
      // console.log("zMap.initCenter",span)
      //开通区域
      zMap.mover();
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
          { strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.5 }
        );
        zMap.xgrids.push(polyline);
        zMap.map.addOverlay(polyline);
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
          { strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.5 }
        );
        zMap.ygrids.push(polyline);
        zMap.map.addOverlay(polyline);
      }

      console.log("网格数据", zMap.ygrids);
    },
    getSpan: function() {
      //获取网格的跨度
      var scale = 0.75;
      var x = 0.0524;

      //0.00064;
      //	for (var i = this.level; i < 19; i++) {
      //    x *= 2;
      //}
      var y = 0.04492;
      //parseFloat((scale * x).toFixed(5));
      return { x: x, y: y };
    },
    getGrid: function(point) {
      //返回当前点在所在区块的四个顶点
      var zMap = this;
      //先找出两条纵线坐标
      var xpoints = this.xgrids
        .map(function(polyline) {
          return polyline.getPath()[0].lng;
        })
        .filter(function(lng) {
          return Math.abs(lng - point.lng) <= zMap.span.x;
        })
        .sort(function(a, b) {
          return a - b;
        })
        .slice(0, 2);

      //再找出两条横线的坐标
      var ypoints = this.ygrids
        .map(function(polyline) {
          return polyline.getPath()[0].lat;
        })
        .filter(function(lat) {
          return Math.abs(lat - point.lat) <= zMap.span.y;
        })
        .sort(function(a, b) {
          return a - b;
        })
        .slice(0, 2);

      //	this.map.centerAndZoom(new BMap.Point(xpoints[0], ypoints[0]), zMap.level);
      // console.log("00011总",new BMap.Point(xpoints[0], ypoints[0]))
      // console.log("00011",new BMap.Point(xpoints[0]+0.0262, ypoints[0]+0.02246))
      return [
        new BMap.Point(xpoints[0], ypoints[0]),
        new BMap.Point(xpoints[0], ypoints[1]),
        new BMap.Point(xpoints[1], ypoints[1]),
        new BMap.Point(xpoints[1], ypoints[0])
      ];
    },
    reset: function() {
      //重置
      this.map.reset();
    },
    ZPoint: function(x, y, code) {
      this.code = code;
      this.point = new BMap.Point(x, y);
    },
    fromtext() {
      let that = this;
      var onoff;
      if (that.mapsd.active) {
        onoff = 1;
      } else {
        onoff = 0;
      }
      this.$axios
        .post("map/change_status", {
          area_id: that.mapsd.region_id,
          active: onoff
        })
        .then(res => {
          if (res.data.active) {
            that.flag = false;
            this.$message({
              showClose: true,
              message: "区域已开通"
            });
          } else {
            that.flag = false;
            this.$message({
              showClose: true,
              message: "区域已关闭"
            });
          }
        });
    },
    qvxiao() {
      this.flag = false;
    },
    mover(){
      //已开通区域
       let zmap = this;
       var zMap=this;
      for (var i = 1; i < zMap.mapdetail.length; i++) {
        if (zMap.mapdetail[i].active) {
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
          ];
          var key =
            "" + points[0].lng + points[0].lat + points[2].lng + points[2].lat; //使用两个点的坐标作为key
          var polygon = new BMap.Polygon(points, {
            strokeColor: "red",
            strokeWeight: 2,
            strokeOpacity: 0.5
          });
          polygon.setFillColor("green");

          zMap.map.addOverlay(polygon);
          zMap.beSelectBounds[key] = polygon;
        }
      }
    }
  }
};
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
  width: 90%;
  position: absolute;
  margin: 60px auto;

  left: 0;
  right: 0;
  z-index: 10;
  background: white;
}
</style>
