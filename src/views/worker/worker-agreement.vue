<template>

  <div class="box">
    <h3>《汽车服务技师合作协议》</h3>
    <div class="cont">
      <div class="title">
      </div>

      <div class="content">{{content}}</div>

    </div>

    <div class="agreebox"
         @click="agree()">同意</div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
var url = require('./url.js')
export default {

  data () {
    return {
      img1: false,
      img2: false,
      img3: false,
      verification: '',
      vcode: '',
      content: '',
      content2: ''

    }
  },

  created () {
  },
  mounted () {
    var urls = window.location.href.split('?')[0]
    var _that = this
    _that.$http
      .get(url + '/api/Register/getProtocolConfig?access_key=xunjiepf')
      .then(rs => {
        _that._data.content = rs.data.info.worker_protocol
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    agree () {
      this.$router.push({
        path: '/agent-agreement?type=worker'
      })
    }
  },
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  width: 100%;
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
}
.agreebox {
  width: 100%;
  line-height: 60px;
  font-weight: 600;
  background: #ffda44;
  text-align: center;
  position: fixed;
  bottom: 0;
}
.title {
  line-height: 30px;
  font-size: 20px;
}
.van-tab__pane {
  margin-top: 10px;
}
.cont {
  margin-top: 60px;
}
.content2,
.content {
  text-align: left;
  width: 96%;
  margin-left: 2%;
  font-size: 15px;
  line-height: 30px;
  white-space: pre-wrap;
}
</style>
