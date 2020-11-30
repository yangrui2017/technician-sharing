<template>
  <div class="box">
    <van-nav-bar title="技师审核"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="listdivs">
      <van-cell v-for="(item,index) in list"
                :title="item.user_name"
                @click="addmanage(item)"
                value="待审核"
                :key="index" />

    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, CellGroup, Dialog, Toast } from 'vant'
var url = require('../worker/url.js')
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: 4,
      list: []

    }
  },
  mounted () {
    var _that = this;
    var store_id = this.getQueryString('store_id');

    _that.$http
      .post(url + '/api/store/storeStuffExList', {
        "access_key": "xunjiepf",
        "store_id": store_id
      })
      .then(rs => {
        Toast("目前没有可审核技师")
        _that._data.list = rs.data;
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    onClickLeft () {
      var store_id = this.getQueryString('store_id')
      this.$router.push({
        path: '/franchise-partner?store_id=' + store_id
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    addmanage (item) {
      var _that = this;
      var store_id = this.getQueryString('store_id')
      Dialog.confirm({
        title: '技师审核',
        message: '是否同意' + item.user_name + '技师通过审核',
        closeOnClickOverlay: true,
        confirmButtonText: "同意",
        cancelButtonText: "拒绝"
      })
        .then(() => {
          _that.$http
            .post(url + '/api/store/updateStuff', {
              "access_key": "xunjiepf",
              "uid": item.uid,
              "auth_state": 3
            })
            .then(rs => {
              if (rs.data.status == "1") {
                Toast("审核通过")
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          _that.$http
            .post(url + '/api/store/updateStuff', {
              "access_key": "xunjiepf",
              "store_id": store_id,
              "auth_state": 4
            })
            .then(rs => {
              if (rs.data.status == "1") {
                Toast("审核不通过")
              }
            })
            .catch(err => {
              console.log(err)
            })
        });
    }


  },
  components: {

    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    [Dialog.Component.name]: Dialog.Component,

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
