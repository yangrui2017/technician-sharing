<template>
  <div class="box">
    <header>


    </header>
     <el-header  class="header">您一共分享{{sharenumber}}次</el-header>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      nickname:"",
      headerimg:"",
      sharenumber:"20"
      
    }
  },
   mounted() {
    var _that = this;
    var unionid=JSON.parse(localStorage.getItem("userinfo")).unionid;
    _that.$http.post(_that.$api+"/wx/event/wx_share/log/", {      
            "unionid":unionid
    })
    
    .then(function(response) {
      _that._data.sharenumber=response.data.count
    })
    .catch(function(error) {
      console.log(error);
    });
  },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if( parseInt(row.id)%2 ==0 ){
          return 'warning-row';
        }else{
         return 'success-row';
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  width: 100%;
  height: 200px;
  background: red;
}


</style>
