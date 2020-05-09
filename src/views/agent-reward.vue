<template>
  <div class="box">
    <h3>代理奖金</h3>
    <p class="allpoints">当前所得佣金{{points}}</p>
    <van-cell-group>
      <van-cell v-for="(item,index) in list"
                :key=index
                :title="item.created_on"
                :value="item.commision"
                :label="item.member_uid" />
    </van-cell-group>

    <agenttitle />
    <div class="footer">----------------显示所有记录----------------</div>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
import agenttitle from '../components/agent-title'
export default {
  data () {
    return {
      points: '',
      list: [
        {          'creattime': '2018-01-02',
          'points': '50'
        },
        {          'creattime': '2018-01-02',
          'points': '50'
        }

      ]
    }
  },
  created () {
    var openid = localStorage.getItem('openids')
    var onoff = true
    if (openid == 'undefined' || openid == null) {
      var _that = this
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('openids', response.data.openid)
            localStorage.setItem('userinfo', JSON.stringify(response.data))
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        //					获取code
        let formDatas = new FormData()
        formDatas.append('r_url', urls)
        _that.$http.post(_that.$api + '/wx/worker/wx_js_sign', formDatas)

          .then(function (response) {
            urls = encodeURIComponent(urls)
            let link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
              response.data.appId +
              '&redirect_uri=' +
              urls +
              '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
            window.location.replace(link)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  mounted () {
    var _that = this
    var unionid = JSON.parse(localStorage.getItem('userinfo')).unionid
    _that.$http
      .post(_that.$api + '/wx/agent/get_his', { 'unionid': unionid })
      .then(rs => {
        _that._data.points = rs.data.comm.amount
        _that._data.list = rs.data.comm_his
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  },
  components: {
    'agenttitle': agenttitle,
    'van-cell': Cell,
    'van-cell-group': CellGroup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #ffa200;
}
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: white;
  background: #f34230;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
.van-cell-group,
.van-cell {
  background-color: transparent;
  color: white;
}
.van-cell__label,
.van-cell__value {
  color: white;
}
.allpoints {
  color: white;
}
</style>
