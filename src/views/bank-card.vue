<template>
  <div class="box">
    <h3>银行卡</h3>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="微信账户"
                  clickable
                  @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="尾号2201"
                  clickable
                  @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="agreebox"
         @click="addbank()">添加银行卡</div>
  </div>
</template>

<script>
import { CellGroup, Cell, RadioGroup, Radio } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      radio: '1'
    }
  },
  mounted () {
    var _that = this
    _that.run()
  },
  methods: {
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).muser.unionid
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).muser.headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).muser.nick

      _that.$http
        .get(_that.$api + '/wx/agent/get_by_unionid?unionid=' + unionid)
        .then(rs => {
          if (rs.data == null) {
            Toast('您还不是代理请先注册代理')
            _that.$router.push({
              path: '/agent-agreement?type=agent'
            })
          } else {
            if (rs.data.is_active == '0') {
              Toast('您还不是代理请先注册代理')
              sessionStorage.setItem('agentmessage', JSON.stringify(rs.data))
              _that.$router.push({
                path: '/agent-agreement?type=agent'
              })
            } else if (rs.data.is_active == '2') {
              Toast('您已经是代理了')
              _that.$http
                .post(_that.$api + '/wx/agent/get_his', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.comm = response.data.comm
                  _that._data.commlCaimed = response.data.commlCaimed
                  _that._data.commPaid = response.data.commPaid
                  _that._data.list = response.data.comm_his.awardByMonth
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addbank () {
      this.$router.push({
        path: '/add-bankcard'
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    withdrawal () {
      var _that = this
      _that.$router.push({
        path: '/withdrawal'
      })
    },

    capitallink (value, index) {
      var _that = this
      var date = new Date()
      if (index == undefined) {
        var month = date.getMonth() + 1
      } else {
        var month = index
      }
      _that.$router.push({
        path: '/fund-details?type=' + value + '&month=' + month
      })
    }
  },
  components: {
    'van-cell-group': CellGroup,
    'van-radio-group': RadioGroup,
    'van-cell': Cell,
    'van-radio': Radio

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 0;
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
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}
.header {
  width: 100%;
  background: white;
  padding-top: 20px;
}
h3 {
  height: 50px;
  margin: 0;
  line-height: 50px;
  color: black;
  background: #ffda44;
}

.account {
  width: 90%;
  line-height: 60px;
  margin-top: 20px;
  background: #c52525;
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  margin-left: 5%;
}
.postform {
  width: 90%;
  line-height: 50px;
  margin-top: 20px;
  background: #dec662;
  color: black;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  margin-left: 5%;
}
.changecard {
  width: 90%;
  margin-left: 5%;
  text-align: right;
  color: blue;
  line-height: 40px;
}
.cont {
  width: 100%;
  background: white;
  margin-top: 10px;

  padding-bottom: 20px;
}
.text {
  font-size: 14px;
  line-height: 50px;
}
.text2 {
  font-size: 16px;
  line-height: 50px;
  color: blue;
}
</style>
