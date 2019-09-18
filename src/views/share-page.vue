<template>
  <div class="box">
     <header>
	      <h2 id="text1" class="ThreeDee">{{name}}</h2>
        
    <div class="description">{{description}}</div>
    </header>
    <h3>由<span class="originator">{{originator}}</span>分享给您的优惠券</h3>
    <div  v-if="imgshow">
      <img :src="qrcodeurl" class="qrcode"/>
    </div>
      <div class="coupon"  v-if="divshow">
      <div class="coupontext">
        <span class="integraltext">{{usr_points}}</span>积分
      </div>
       <div  class="couponinp" @click="butreceive" >
        点击领取
      </div>
    </div>
    <div class="qrcode">
        <img src="../assets/jishi.jpg" class="imgurl"/>
        <p class="entd">长按识别二维码更多活动内容尽在节油大师</p>
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
      description:"",
      name:"",
      key:"123",
     originator:"",
     qrcodeurl:"",
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
     var unionid=JSON.parse(localStorage.getItem("userinfo")).unionid;
    _that.$http.post(_that.$api+"/wx/event/user_event/result/", {           
            "event_scene_str":key,
            "viewer_openid": localStorage.getItem("openids"),
            "viewer_unionid": unionid
    })
    .then(function(response) {
      console.log()
       _that._data.description=response.data.usr_event.description;    
        _that._data.name=response.data.usr_event.name;  
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
            "suser_openid":localStorage.getItem("openids"),
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
        overflow: scroll;
        background:#25034d;
        position: relative;
    }

h2 {
  text-align: center;
}
h3{
      color: white;
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
  border-radius: 5px;
      text-align: center;
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
.description{
  color:white;
  font-size: 16px
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
header{
   width: 100%;
   height: 300px;
         background: url(../assets/header.png);
        background-size: 100% 100%;
}
 h2 {
        text-align:center;
        font-size:35px;
        color:#FFFFFF; 
    }
    .ThreeDee {
text-shadow:0px 0px 0 rgb(117,186,218),1px 1px 0 rgb(106,175,207),2px 2px 0 rgb(94,163,195),3px 3px 0 rgb(83,152,184),4px 4px 0 rgb(71,140,172),5px 5px 0 rgb(60,129,161),6px 6px 0 rgb(48,117,149), 7px 7px 0 rgb(36,105,137),8px 8px 7px rgba(0,0,0,0.3),8px 8px 1px rgba(0,0,0,0.5),0px 0px 7px rgba(0,0,0,.2);}
.qrcode{
  width: 80%;
  margin-left:10%;
  border-radius: 5px;
  height: 120px;
  background: white;
}
.imgurl{
  width: 100px;
  margin-top: 10px;
  text-align: left;
  margin-left: 10px;
  
}
.entd{
  margin:20px 10px 0 0;
  width: 60%;
float: right;
color: black;
line-height: 40px;
font-size: 15px;
}
</style>
