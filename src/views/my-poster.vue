<template>
  <div class="box">
      
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
    
      
    }
  },
   mounted() {
    var _that = this;
    _that._data.headerimg=JSON.parse(localStorage.getItem("userinfo")).headimgurl;
     _that._data.nickname=JSON.parse(localStorage.getItem("userinfo")).nickname;
    var openid=localStorage.getItem("openids");
  _that.$http.get(_that.$api+"/wx/event/user_event/result_by_openid/?openid="+openid)
    .then(function(response) {
      _that._data.list=response.data.user_event_result;
    })
    .catch(function(error) {
      console.log(error);
    });
     _that.$http.get(_that.$api+"/wx/event/user_event/global_point/?openid="+openid)
    .then(function(response) {
       _that._data.points=response.data.points;
    })
    .catch(function(error) {
      console.log(error);
    });
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
    background: url(../assets/haibao.png);
    background-size: 100%;
}
	
</style>
