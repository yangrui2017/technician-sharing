<template>
  <div class="box">
     <el-header  class="header">您一共分享{{sharenumber}}次</el-header>
    <el-table
    :data="tableData"
     :row-class-name="tableRowClassName"
    border
    style="width: 100%;font-size: 10px">
    <el-table-column
      prop="created_on"
      label="分享时间">
    </el-table-column>
    <el-table-column
      prop="name"
      label="活动名称">
    </el-table-column>
    <el-table-column
      prop="user"
      label="被分享人">
    </el-table-column>
     <el-table-column
      prop="reward"
      label="获得奖励">
    </el-table-column>
  </el-table>     
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      sharenumber:"20",
      tableData: [ {
          id:"1",
          created_on:"2019-06-10 06:19:21",
          name:"由技师分享用户",
          user:"挑剔",
          reward:"+20积分"

        }, {
            id:"2",
          created_on:"2019-06-10 06:19:21",
          name:"由技师分享用户",
          user:"挑剔",
          reward:"+20积分"

        }, {
           id:"3",
          created_on:"2019-06-10 06:19:21",
          name:"由技师分享用户",
          user:"挑剔",
          reward:"+20积分"

        },
         {
            id:"4",
          created_on:"2019-06-10 06:19:21",
          name:"由技师分享用户",
          user:"挑剔",
          reward:"+20积分"

        }]
    }
  },
   mounted() {
    var _that = this;
    _that.$http.get(_that.$api+"/wx/event/wx_share/log/", {      
            "unionid": localStorage.getItem("unionid")
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
.header{
  margin: 0;line-height: 60px;
}
.el-table tr{
  background: none
}
.box{
  width: 100%;
  height: 100%;
  background: url(../assets/true.jpg);
  background-size: 100% 100%;
  color: white
  }
  .warning-row {
    background: red;
  }

 .success-row {
    background: black;
  }
</style>
