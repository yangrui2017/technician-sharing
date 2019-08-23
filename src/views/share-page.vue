<template>
  <div class="box">
    <h2>由<span class="originator">{{originator}}</span>分享给您的优惠券</h2>
    <div  v-if="imgshow">
      <img :src="qrcodeurl" class="qrcode"/>
      <p>{{text}}</p>
    </div>
      <div class="coupon"  v-if="divshow">
      <div class="coupontext">
        <span class="integraltext">{{usr_points}}</span>积分
      </div>
       <div  class="couponinp" @click="butreceive" >
        点击领取
      </div>
    </div>
    
  </div>
</template>

<script>
import qrcodeurl from "../assets/erweima.jpg"
export default {
  data() {
    return {
      divshow:true,
      imgshow:false,
      butreceives:true,
      key:"123",
     originator:"",
     qrcodeurl:"",
     text:"如未关注公众用户，请先关注公众号再领取",
     points:"",
     coupon_class_id:"",
     usr_points:"",
     usr_coupon_class_id:""
    };
  },
  created() {
  },
  mounted() {
    var _that = this;
   var key= _that.getQueryString("key");
    _that._data.key=key;
    _that.judge = JSON.parse(sessionStorage.getItem("judge"));//获取菜单并显示
     var unionid=JSON.parse(localStorage.getItem("userinfo")).unionid;
    _that.$http.post(_that.$api+"/wx/event/user_event/result/", {           
            "event_scene_str":key,
            "viewer_openid": localStorage.getItem("openids"),
            "viewer_unionid":unionid
    })
    .then(function(response) {
      _that._data.originator=response.data.current_user.nickname;    
       _that._data.points=response.data.usr_event.points;
        _that._data.coupon_class_id=response.data.usr_event.coupon_class_id;
        _that._data.usr_coupon_class_id=response.data.usr_event.usr_coupon_class_id;
      if(response.data.current_user.subscribe ==0){
           _that._data.imgshow=true;
            _that._data.divshow=false;
           _that._data.qrcodeurl=response.data.event_qr.qr_url;
      }else{
     _that._data.usr_points=response.data.usr_event.usr_points;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  methods: {
   getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    butreceive(){
        var _that=this;
         var arr={
            "suser_openid":localStorage.getItem("openid"),
            "points":_that._data.points,
            "coupon_class_id":_that._data.coupon_class_id,
            "usr_points":_that._data.usr_points,
            "usr_coupon_class_id": _that._data.usr_coupon_class_id
        }
        if(_that._data.butreceives){
        _that.$http.post(_that.$api+"/wx/event/allocate_pc/result/",arr)
            .then(function(response) {
              if(response.data.point_res[0].errcode=="0"){
                alert("添加成功");
                _that._data.butreceives=false;
                 
              }else{
                 alert(response.data.point_res.errmsg)
              }
            
            })
        }
       
        
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url(../assets/fuwu.png);
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

h2 {
  text-align: center;
}

p {
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
}
.qrcode{
  width: 50%;
  margin-top: 50px
}
.originator{
  color:red
}
.coupon{
  color: white;
  background: red;
  width: 80%;
  height: 100px;
  margin-left: 10%;
  border-radius: 5px
}
.coupontext{
  float: left;
  width: 70%;
  line-height: 100px;
  font-size: 15px;
}
.integraltext{
    font-weight: 600;
    font-size: 45px;
}
.couponinp{
  float: right;
  width: 30%;
  line-height:100px;
  color: black;
  background: #f2fd5b;
}
.integral{
    width: 51%;
    float: left;
}
</style>
