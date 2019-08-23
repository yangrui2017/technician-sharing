
<template>
  <div class="box">
      <header>
	      <h2 id="text1" class="ThreeDee">{{name}}<br>{{text}}</h2>
    </header>
     <div class="nametext">E帮洗车欢迎你：<span>{{nickname}}</span></div>
     <div class="but">
        <p>---------------------   活动介绍   ---------------------</p>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in list"  :span="12" :key="index"     >
           <el-card :body-style="{ padding: '0px' }">
               <img :src="'https://s3.cn-northwest-1.amazonaws.com.cn/wechat-qr/'+item.post_url" class="image"    @click="operable(index)"/>
              <div style="padding: 14px;"  @click="operable(index)">
                <span class="activityname">{{item.name}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{item.description}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
      </el-row>
        <div  v-for="(item,index) in list2" :key="index" class="registerbox">
        <img :src="item.url" class="imgsrc"/>
        <p>{{item.name}} </p>
      </div>
    </div>
    <div class="textyaoqing">
        <p>---------------------   邀请步骤   ---------------------</p>
          <div class="rule">{{rule}}<br><br>{{rule1}}<br><br>{{rule2}}<br><br>{{rule3}}<br><br>{{rule4}}</div>
    </div>
         <div class="footer">上海联产电子科技</div>  
	</div>
</template>

<script>
import userimg from "@/assets/user.jpg" 
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      name:'技师分享',
      text:'荐者有份',
      rule:'1、严厉禁止和打击恶意刷奖行为。对于恶意刷奖，活动网站有权取消获奖者获奖资格，并保留相关法律权利。',
       rule1:'2、活动主办方有权对任何通过不正当手段参与活动者，主办方有权随时取消其参赛资格。',
      rule2:'3、活动期间，我们将在活动专题页面公布获奖名单。',
       rule3:'4、本次活动的最终解释权归泰合新光华府所有。',
       rule4:'5、参赛者须无条件遵守主办方提及的各项规章制度。',
      record:{},
      list:[],
      list2:[],
      nickname:""
    }
  },
  created(){
    
  },
   mounted(){
       var _that=this;
        let formData = new FormData();
        setTimeout(function(){
            _that._data.nickname=JSON.parse(localStorage.getItem("userinfo")).nickname;
            var unionid=JSON.parse(localStorage.getItem("userinfo")).unionid;
           formData.append("unionid", unionid); // 'file' 可变 相当于 input 表单的name 属性
         _that.$http.post(_that.$api+"/wx/event/user_event/list/",formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then(function(response) {
           
            if( response.data.member_type.WorkerMini ==false){
                _that._data.list2=[{
                    name:"长按关注技师小程序",
                    url:userimg
                  }]
            }else{
            for(var i=0;i<response.data.event[1].length;i++){
                _that._data.list.push(response.data.event[1][i])
            }
            
            }
           
          })
          .catch(function(error) {
            console.log(error);
          });
        },1000)
        
  },
  methods: {
      getQueryString(name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)
			        return  unescape(r[2]);
			      return null;
      },
      operable(index){
            sessionStorage.setItem("operable", JSON.stringify(this.list[index]));//保存当前点击菜单
            window.location.href="http://wx.upctech.com.cn/worker/share-details";
           
      }
  }
}
</script>
<style scoped>
.textyaoqing{
  margin-top: 50px
}
a{text-decoration:none}
.Signout{
  color: yellow
}
.nametext{
  color: white;
  font-size: 16px;
}
header{
   width: 100%;
   height: 300px;
         background: url(../assets/header.png);
        background-size: 100% 100%;
}
    .box {
        width: 100%;
        height: 100%;
        overflow: scroll;
        background:#25034d;
        position: relative;
    }
    
    h2 {
        text-align:center;
        font-size:35px;
        color:#FFFFFF; 
    }
  
    .ThreeDee {
text-shadow:0px 0px 0 rgb(117,186,218),1px 1px 0 rgb(106,175,207),2px 2px 0 rgb(94,163,195),3px 3px 0 rgb(83,152,184),4px 4px 0 rgb(71,140,172),5px 5px 0 rgb(60,129,161),6px 6px 0 rgb(48,117,149), 7px 7px 0 rgb(36,105,137),8px 8px 7px rgba(0,0,0,0.3),8px 8px 1px rgba(0,0,0,0.5),0px 0px 7px rgba(0,0,0,.2);}
   p {
        width:90%;
        margin-left:5%;
        margin-bottom: 20px;
        color: white
    }
    .rule{
        font-size:14px;
         width:86%;
         margin-bottom: 10px;
         border-radius:5px;
         background:#ff3a29;
         padding:3%;
         margin-left:4%;
         text-align:left;
         color:white
    }
    .but{
        margin-top:40px;
        width: 90%;
        margin-left: 5%
    }
    .butdiv{
        display:inline-block;
         width: 90%;
    }
    .registerbox{
      width: 50%;
      margin-left: 25%;
       
    }
    .registerbox:nth-of-type(2){
      float: right;
      width: 49%
       
    }
    .imgsrc{
      width: 60%
    }
    .registerbox p{
      font-size: 15px;
      color: black
    }
    .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .activityname{
    font-size: 14px
  }
  .clearfix:after {
      clear: both
  }
  .footer{
    color: #dcdfe6;
    font-size: 14px;
    line-height: 50px
  }
</style>
