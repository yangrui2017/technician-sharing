<template>
  <div class="box">
    <header>
            <img :src="headerimg"   class="headerimg"/>
            <div class="header">{{nickname}}</div>
    </header>
    <div class="container">
            <div class="van-cell-group__title">技师专享</div>
                <div class="van-cell-group van-hairline--top-bottom">
                    <router-link to="/activity-list">
                    <div class="van-cell van-cell--clickable van-cell--large">
                        <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
                        <div class="van-cell__title"><span>推广活动</span></div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                    </router-link>
                </div>
                 <div class="van-cell-group van-hairline--top-bottom">
                      <router-link to="/my">
                    <div class="van-cell van-cell--clickable van-cell--large">
                        <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
                        <div class="van-cell__title"><span>个人中心</span></div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                     </router-link>
                </div>
                 <div class="van-cell-group van-hairline--top-bottom">
                    <div class="van-cell van-cell--clickable van-cell--large">
                        <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
                        <div class="van-cell__title"><span>技师规则</span></div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                </div>
                  <div class="van-cell-group van-hairline--top-bottom">
                     <router-link to="/qr-code">
                    <div class="van-cell van-cell--clickable van-cell--large">
                        <i class="van-icon van-icon-send-gift-o van-cell__left-icon"></i>
                        <div class="van-cell__title"><span>二维码</span></div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                      </router-link>
                </div>
            </div> 
            
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname:"",
      headerimg:"",
      activeNames: ['1']
      
    }
  },
   mounted() {
        var _that = this;
    setTimeout(function(){
        _that._data.headerimg=JSON.parse(localStorage.getItem("userinfo")).headimgurl;
        _that._data.nickname=JSON.parse(localStorage.getItem("userinfo")).nickname;
        console.log( _that._data.headerimg)
        },1000)
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
}
header{
  width: 100%;
  background: #25034d;
  height: 150px;
}
.header{
  float: left;
  color: white;
  line-height: 150px;
 text-indent:2em 
}
.headerimg{
    margin-left: 20px;
  width: 20%;
  float: left;
  margin-top: 40px;
  border-radius: 50%;

}
.van-cell-group__title {
    margin-top: 2vh;
    /* padding: 5px 5px 5px; */
    font-weight: bold;
    color: darkblue;
    text-align: left;
    background-color: whitesmoke;
    /* box-shadow: 5px 6px 8px 0px rgba(56, 56, 56, 0.21); */
}
.container {
    padding: 20px;
    text-align: left;
}

</style>
