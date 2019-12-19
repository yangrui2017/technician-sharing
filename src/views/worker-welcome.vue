<template>
  <div class="box">
      <div class="content">
          <div class="header">
            <img class="logo" src="../assets/logo.png"/>
            <div class="name">E帮洗车</div>
          </div>
          <div class="text">
            <p>尊敬的{{nickname}}:</p>
          <span>欢迎您注册E帮洗车公众号</span>
          </div>
          <div style="clear:both"></div>
      </div>
    <div class="footer">
      上海联产电子科技有限公司
    </div>
  
  
   
  
   
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname:"",
      
    }
  },
   mounted() {
    var _that = this;
     _that._data.nickname=JSON.parse(localStorage.getItem("userinfo")).nickname;
 
  },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 100%;
  height: 100%;
  background: url(../assets/member2.jpg)  no-repeat;
  background-size: 100% 100%;
  position: relative
}
.showdiv{
  width: 100%;
  height: 50px;
  background: #ebebeb;
}
.header{
  width: 100%;
  margin-top: 90px;
  float: left
}
.logo{
   height: 24px;
    margin-top: 13px;
    margin-left: 2%;
    text-align: left;
}
.name{
  font-size: 18px;
  line-height: 30px;
  color: white
}

.content{
  width: 80%;
  margin-left: 10%;
}
.text{
  float: left;
    width: 70%;
  margin-left: 15%;
  color: white
}
.text p{
  text-align: left;
  
  font-size: 16px;
}
.text span{
  font-size: 14px;
  line-height: 30px;

}
.footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align:center;
  color: white;
  font-size: 14px;
  line-height: 30px;

}
</style>
