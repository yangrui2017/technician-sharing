
<template>
  <div class="box">
			<h2 id="text1">{{name}}<br>{{text}}</h2>
            <p>---------------------邀请步骤---------------------</p>
            <div class="rule">{{rule}}</div>
            <div class="but">
            
             <div v-for="(item,index) in list" :key="index"  @click="operable(index)" class="butdiv">
                 <van-button type="danger">{{item.description}}</van-button>
             </div>
               <div  v-for="(item,index) in list2" :key="index" class="registerbox">
                <img :src="item.url" class="imgsrc"/>
                <p>{{item.name}} </p>
             </div>
            </div>
           
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
      rule:'1.规则，是运行、运作规律所遵循的法则。规则，一般指由群众共同制定、公认或由代表人统一制定并通过的，由群体里的所有成员一起遵守的条例和章程。它存在三种形式：明规则、潜规则、元规则，无论何种规则只要违背善恶的道德必须严惩不贷以维护世间和谐；明规则是有明文规定的规则，存在需要不断完善的局',
      record:{},
      list:[],
      list2:[]
    }
  },
  created(){
    
  },
   mounted(){
       var _that=this;
        let formData = new FormData();
        setTimeout(function(){
            var unionid=localStorage.getItem("unionid");
           formData.append("unionid", unionid); // 'file' 可变 相当于 input 表单的name 属性
         _that.$http.post(_that.$api+"/wx/event/user_event/list/",formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then(function(response) {
            if(JSON.stringify(response.data.WorkerMini) ==false){
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
            window.location.href="http://wx.upctech.com.cn/share-details";
      }
  }
}
</script>
<style scoped>
a{text-decoration:none}
    .box {
        width: 100%;
        height: 100%;
        overflow: scroll;
        background: url(../assets/292787.png);
        background-size: 100% 100%;
        position: relative;
    }
    
    h2 {
        margin-top:50px;
        text-align:center;
        font-size:30px;
        color:#FFFFFF; 
        text-shadow: 0 4px 0 #ccc,  0 2px 0 #c9c9c9,  0 3px 0 #bbb, 
        0 4px 0 #b9b9b9,  0 5px 0 #aaa,  0 6px 1px rgba(0,0,0,.1), 
        0 0 5px rgba(0,0,0,.1),   0 1px 3px rgba(0,0,0,.3), 
        0 3px 5px rgba(0,0,0,.2), 
        0 5px 10px rgba(0,0,0,.25), 
        0 10px 10px rgba(0,0,0,.2), 
        0 20px 20px rgba(0,0,0,.15); 
    }
    p {
        width:90%;
        margin-left:5%;
        margin-bottom: 10px;
    }
    .rule{
        font-size:15px;
         width:86%;
         margin-bottom: 10px;
         border-radius:5px;
         background:#e06319;
         padding:3%;
         margin-left:4%;
         text-align:left;
         color:white
    }
    .but{
        
        margin-top:40px
    }
    .butdiv{
        display:inline-block;
        padding:10px;
        margin-left:10px;
        text-align:center;
        border-radius:10px;
        line-height:30px;
        font-size:15px;
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
</style>
