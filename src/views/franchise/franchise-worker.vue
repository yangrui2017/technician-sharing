<template>
  <div class="box">
    <van-nav-bar title="本月技师洗车详情"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="listdivs">
      <van-cell v-for="(item,index) in workerlist"
                :title="item.user_name"
                @click="addmanage()"
                :value="item.order_num+'单'"
                :key="index" />

    </div>
  </div>
</template>

<script>

import { NavBar, Icon, Cell, CellGroup, Toast } from 'vant'
var url = require('../worker/url.js')
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: 4,
      workerlist: []

    }
  },
  mounted () {
    var _that = this;
    var store_id = JSON.parse(sessionStorage.getItem('nowstore')).store_id
    _that.$http
      .post(url + '/api/store/storeStuff', {
        "access_key": "xunjiepf",
        "store_id": store_id
      })
      .then(rs => {
        if (rs.data == "") {
          Toast('该加盟店还未添加技师!')
        }
        _that._data.workerlist = rs.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/franchise-partner'
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    addmanage () {
      alert(1)
    }


  },
  components: {

    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background-color: rgb(41, 89, 233);
  color: white;
}
.van-nav-bar__title {
  color: white;
}
.van-nav-bar__text,
.van-icon {
  color: white;
}
.van-hairline--bottom::after {
  border: none;
}
.van-cell__title {
  text-align: left;
  text-indent: 2em;
}
.cells i {
  color: black;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}

.listdivs {
  padding-bottom: 10px;
  background: white;
  width: 96%;
  margin-left: 2%;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
}
.listtitle {
  margin-top: 20px;
  font-size: 16px;
  text-align: left;
  text-indent: 1em;
  line-height: 40px;
  font-weight: 600;
  height: 40px;
  border-bottom: 1px solid #969799;
}
.listtitle div {
  width: 50%;
  float: left;
}
.listtitle .listtitlediv {
  width: 30%;
  float: right;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
</style>
