<template>

  <div class="box">
    <h3>加盟店列表</h3>
    <van-cell v-for="(item,index) in list"
              :title="item.store_name"
              is-link
              :value='item.is_active==1 ? "待审核":"已审核"'
              :key="index"
              @click="look(item)" />
    <div class="addstore"
         @click="add()">添加门店</div>
  </div>
</template>

<script>
import { Cell, CellGroup, Toast } from 'vant'
import { setTimeout } from 'timers'
import Exif from 'exif-js'
import pice from '../../assets/pice.png'
var url = require('../worker/url.js')
export default {

  data () {
    return {
      list: []
    }
  },
  created () {

  },
  mounted () {
    this.run()

  },
  methods: {
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      var user_headimg = JSON.parse(localStorage.getItem('userinfo')).muser.headimgurl
      var nick_name = JSON.parse(localStorage.getItem('userinfo')).muser.nick

      _that.$http
        .post(_that.$api + '/wx/ptnr/get_partner_uid', {

          "unionid": unionid

        })
        .then(rs => {
          var data = [];

          rs.data.stores.forEach(element => {
            if (element.is_active != 0) {
              data.push(element)
            }
          });
          _that._data.list = data
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    add () {
      this.$router.push({
        path: '/add-franchise'
      })
    },
    look (index) {
      var _that = this
      if (index.is_active == 1) {
        Toast('该加盟店正在审核中，请稍等')
      } else {
        _that.$router.push({
          path: '/franchise-partner?store_id=' + index.store_id
        })
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addstore {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: white;
  position: fixed;
  bottom: 0;
  background: rgb(41, 89, 233);
}
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: white;
  background: rgb(41, 89, 233);
}
.service {
  font-size: 14px;
  line-height: 24px;
}
.servicetext {
  font-size: 14px;
  line-height: 24px;
}
.headertext a {
  color: white;
}

.box {
  width: 100%;
  height: 100%;
  background: white;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;

  margin-top: 20px;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.imgurl {
  width: 100%;
}
.imgurl2 {
  width: 80%;
  height: 200px;
}
.van-button--normal {
  width: 75%;
  margin-top: 20px;
}
</style>
