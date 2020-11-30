<template>
  <div class="box">
    <van-nav-bar title="账单明细"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <van-popup v-model="showPicker"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           type="year-month"
                           title="选择年月"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="onConfirm"
                           @cancel="showPicker = false" />
    </van-popup>
    <div class="content">
      <div class="listdiv">
        <div class="listtitle">
          <div class="leftdiv">{{time}}</div>
          <div class="listtitlediv">
            <van-button type="primary"
                        plain
                        round
                        size="small"
                        @click="showPicker = true">选择时间</van-button>
          </div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">订单总数</div>
          <div class="listtextright detailed">{{month_order_num}}单</div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">月盈利额</div>
          <div class="listtextright detailed">{{month_net_income}}￥</div>
        </div>
      </div>
      <div class="listdiv"
           v-for="(item,index) in list"
           :key="index">
        <div class="listtitle">
          <div>{{item.create_time}}</div>
          <div class="orderid">订单编号：{{item.order_no}}</div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">佣金：{{item.service_money}}</div>
          <div class="listtextleft detailed">项目金额：{{item.money}}</div>
          <div class="listtextleft detailed">服务技师：{{item.user_name}}</div>
          <div class="listtextleft detailed">项目名称：{{item.item_title}}</div>
        </div>

      </div>

    </div>

    <div class="footer">----------------已显示所有记录----------------</div>

  </div>
</template>

<script>
var url = require('../worker/url.js')
import { Tab, Tabs, Col, Row, Button, Popup, DatetimePicker, NavBar, Toast } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      type: '',
      showPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      time: "",
      month_order_num: "",
      month_net_income: "",
      list: []
    }
  },
  created () {

  },
  mounted () {
    var _that = this;
    var store_id = JSON.parse(sessionStorage.getItem('nowstore')).store_id;
    var date = new Date();
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    _that._data.time = y + "年" + m + "月"
    _that.$http
      .post(url + '/api//store/orderList', {
        "access_key": "xunjiepf",
        "store_id": store_id,
        "year": 0,
        "month": 0
      })
      .then(rs => {
        _that._data.month_order_num = rs.data.month_order_num
        _that._data.month_net_income = rs.data.month_net_income
        _that._data.list = rs.data.list
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
    onConfirm (time) {
      var _that = this;
      var date = new Date(time);
      var y = date.getFullYear(time)
      var m = date.getMonth(time) + 1
      _that._data.time = y + "年" + m + "月"
      var store_id = JSON.parse(sessionStorage.getItem('nowstore')).store_id
      _that.$http
        .post(url + '/api//store/orderList', {
          "access_key": "xunjiepf",
          "store_id": store_id,
          "year": y,
          "month": m
        })
        .then(rs => {
          if (rs.data.month_order_num == "0") {
            Toast('查询的该月没有订单')
          }
          _that._data.month_order_num = rs.data.month_order_num
          _that._data.month_net_income = rs.data.month_net_income
          _that._data.list = rs.data.list;

          _that._data.showPicker = false;
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
    }
  },
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-popup': Popup,
    'van-datetime-picker': DatetimePicker,
    'van-nav-bar': NavBar,

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
p {
  margin: 0;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}

.content {
  padding-top: 10px;
}
.listtext {
  height: 60px;
}
.leftdiv {
  width: 50%;
  float: left;
}
.orderid {
  border-top: 1px solid #969799;
  font-size: 13px;
  line-height: 30px;
}
.detailed {
  width: 50%;
  float: left;
  text-align: left;
  text-indent: 1em;
  line-height: 30px;
  height: 30px;
  font-size: 13px;
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
  margin-top: 10px;
  color: black;
  border-radius: 5px;
}

.listtitle {
  font-size: 16px;
  text-align: left;
  text-indent: 1em;
  line-height: 40px;
}

.listtitle .listtitlediv {
  width: 30%;
  float: right;
}

.mytitle {
  background: #ffda44;
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
.integraltext {
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
}
</style>
