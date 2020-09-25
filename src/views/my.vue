<template>
  <div class="box">
    <div class="cover"
         v-if="onoff">
      <h3>代理账户</h3>
      <div class="cont">
        <img src='../assets/examine.png'
             class="img">
        <div class="text">{{language}}</div>
        <div class="joinbut"
             v-if="jonagent">
          <van-button plain
                      type="info"
                      @click="join()">代理加盟
          </van-button>
        </div>

      </div>
    </div>
    <header>
      <div class="usertext">
        <img :src="headerimg"
             class="headerimg" />
        <div class="header">账户名：{{nickname}}</div>
      </div>
    </header>
    <van-tabs background="white">
      <van-tab title="资金">
        <div class="mytitle">
          <van-row>
            <van-col span="12"
                     class="">
              <div class="capitaltext">
                <p class="balance">
                  账户余额：
                </p>
                <p class="balanceint">${{comm}}</p>
              </div>

              <div class="capitaltext">
                可提现额:<span>${{commPaid}}</span>
              </div>

              <div class="capitaltext">
                已提现总额：<span>${{commlCaimed}}</span>
              </div>
              <div class="reminder"
                   v-if="show">
                提现审核中
              </div>
            </van-col>
            <van-col span="6">

            </van-col>
            <van-col span="6"
                     class="capitaltext">
              <div class="but">
                <van-button type="primary"
                            plain
                            block
                            size="small"
                            round
                            @click="withdrawal()">
                  申请提现
                </van-button>
              </div>
              <div class="but">
                <van-button type="primary"
                            plain
                            block
                            size="small"
                            @click="capitallink('capital')"
                            round>
                  资金明细
                </van-button>
              </div>

            </van-col>
          </van-row>
        </div>

        <div class="listdiv"
             v-for="(item,index) in list"
             :key="index">
          <div class="listtitle">
            <div>{{item.ym}}</div>
            <div class="listtitlediv">
              <!-- <van-button type="primary"
                          plain
                          round
                          size="small"
                          @click="capitallink('capital')">明细</van-button> -->
            </div>
          </div>

          <div class="listtext">
            <div class="listtextleft detailed">服务佣金</div>
            <div class="listtextright detailed">{{item.commision}}</div>
          </div>

        </div>

      </van-tab>
      <van-tab title="积分">
        <div class="mytitle">
          <van-row>
            <van-col span="12"
                     class="">
              <div class="integraltext">
                当前积分：<span>123</span>
              </div>
            </van-col>
            <van-col span="6">

            </van-col>
            <van-col span="6"
                     class="capitaltext">
              <div class="buts">
                <van-button type="primary"
                            plain
                            block
                            size="small"
                            @click="capitallink('integral')"
                            round>
                  积分明细
                </van-button>
              </div>

            </van-col>
          </van-row>
        </div>

        <div class="listdiv">
          <div class="listtitle">
            <div>2020年5月</div>
            <div class="listtitlediv">
              <!-- <van-button type="primary"
                          plain
                          round
                          size="small">明细</van-button> -->
            </div>
          </div>

          <div class="listtext">
            <div class="listtextleft detailed">代理积分</div>
            <div class="listtextright detailed">+122积分</div>
          </div>

        </div>
      </van-tab>
      <van-tab title="会员">
        <div class="mytitle">
          <van-row>
            <van-col span="18"
                     class="">
              <div class="integraltext">
                您成功推广的会员总数：<span>{{fansnumber}}</span>
              </div>
            </van-col>

            <van-col span="6"
                     class="capitaltext">
              <!-- <div class="buts">
                <van-button type="primary"
                            plain
                            block
                            size="small"
                            @click="capitallink('integral')"
                            round>
                  资金明细
                </van-button>
              </div> -->

            </van-col>
          </van-row>

        </div>
        <div class="listdivs">
          <div class="tabletitle">会员详情列表</div>
          <table class="hovertable">
            <tr>
              <th>关注日期</th>
              <th>会员昵称</th>
            </tr>
            <tr v-for="(item,index) in fanslist">
              <td>{{item.created_on}}</td>
              <td>{{item.nick}}</td>
            </tr>

          </table>
        </div>
      </van-tab>
    </van-tabs>

    <div class="footer">----------------已显示今年所有记录----------------</div>

  </div>
</template>

<script>
import { Tab, Tabs, Col, Row, Button, Toast } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      onoff: false,
      jonagent: false,
      show: false,
      nickname: '',
      headerimg: '',
      sharenumber: '20',
      comm: '',
      commPaid: '',
      commlCaimed: '',
      list: [],
      language: '',
      fanslist: [],
      fansnumber: "",

    }
  },
  created () {
    var openid = localStorage.getItem('openids')
    var onoff = true
    if (openid == 'undefined' || openid == null || onoff) {
      var _that = this
      var urls = window.location.href.split('?').toString()
      var code = _that.getQueryString('code')
      if (code !== '' && code !== null && code !== undefined) {
        _that.$http
          .get(_that.$api + '/wx/worker/userinfo_by_code?code=' + code)
          .then(function (response) {
            localStorage.setItem('openids', response.data.openid)
            localStorage.setItem('userinfo', JSON.stringify(response.data))
            if (response.data.xcx_uid == null) {
              _that.run()
            } else {
              _that._data.onoff = true
              _that._data.language = '您已加盟技师，请在技师账户查看您的权益'
            }
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
  },
  methods: {
    run () {
      var _that = this
      var urls = window.location.href.split('?')[0]
      var unionid = JSON.parse(localStorage.getItem('userinfo')).userData.unionid
      _that._data.headerimg = JSON.parse(localStorage.getItem('userinfo')).userData.headimgurl
      _that._data.nickname = JSON.parse(localStorage.getItem('userinfo')).userData.nickname

      _that.$http
        .get(_that.$api + '/wx/agent/get_by_unionid?unionid=' + unionid)
        .then(rs => {
          if (rs.data == null) {
            _that._data.onoff = true
            _that._data.jonagent = true
            _that._data.language = '想要加盟代理吗？成为E帮车服代理，您将拥有所推广会员的所有服务消费和商品消费的提成权益，一次推广，终身受益！加盟请点击公众号“代理加盟”菜单申请注册。'
          } else {
            if (rs.data.is_active == '0') {
              _that._data.onoff = true
              _that._data.jonagent = true
              _that._data.language = '想要加盟代理吗？成为E帮车服代理，您将拥有所推广会员的所有服务消费和商品消费的提成权益，一次推广，终身受益！加盟请点击公众号“代理加盟”菜单申请注册。'
            } else if (rs.data.is_active == '2') {
              _that.$http
                .post(_that.$api + '/wx/agent/get_his', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.comm = response.data.comm.amount
                  _that._data.commlCaimed = response.data.comm.amount_claimed
                  _that._data.commPaid = response.data.comm.amount_paid
                  _that._data.list = response.data.comm_his.awardByMonth
                })
                .catch(function (error) {
                  console.log(error)
                });
              _that.$http
                .post(_that.$api + '/wx/worker/fans', {
                  'unionid': unionid
                })
                .then(function (response) {
                  _that._data.fanslist = response.data.fan_member;
                  _that._data.fansnumber = response.data.fan_member.length;

                  console.log()
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
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    join () {
      var _that = this
      _that.$router.push({
        path: '/agent-examine'
      })
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
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabletitle {
  text-align: center;
  line-height: 60px;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}
h3 {
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
}
.cover {
  width: 100%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  z-index: 100;
}
.cont {
  margin-top: 60px;
}
.joinbut {
  margin-top: 100px;
}
.img {
  width: 80px;
  height: 104px;
}
.text {
  line-height: 40px;
  width: 90%;
  margin-left: 5%;
}
table.hovertable {
  width: 100%;
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #999999;
  border-collapse: collapse;
}
table.hovertable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.hovertable tr {
  /* background-color: #d4e3e5; */
}
table.hovertable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
p {
  margin: 0;
}

header {
  width: 100%;
  background: #ffda44;
  height: 150px;
}
.listtext {
  height: 30px;
}
.detailed {
  width: 50%;
  float: left;
  text-align: left;
  text-indent: 1em;
  line-height: 30px;
  font-size: 13px;
}
.header {
  float: left;
  color: black;
  line-height: 150px;
  text-indent: 2em;
}
.capitaltext {
  font-size: 14px;
  line-height: 30px;
}
.headerimg {
  margin-left: 20px;
  width: 20%;
  float: left;
  margin-top: 40px;
  border-radius: 50%;
}
.headertitle {
  font-size: 15px;
  line-height: 40px;
  margin-bottom: 10px;
  border-left: 5px solid #1989fa;
  background: #2177ad;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
.usertext {
  height: 80%;
  overflow: hidden;
}
.userpoints {
  height: 20%;
  text-align: left;
  color: white;
  line-height: 30px;
  margin-left: 20px;
}
.listdiv {
  background: white;
  width: 96%;
  margin-left: 2%;
  color: black;
  border-radius: 5px;
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

.mytitle {
  background: white;
}
.balance {
  font-size: 14px;
}
.balanceint {
  font-size: 20px;
  font-weight: 600;
  width: 50%;
  margin-left: 25%;
  border-bottom: 1px solid black;
}

.reminder {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
}
.but {
  margin-top: 10px;
  margin-right: 10px;
}
.buts {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.integraltext {
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
}
</style>
