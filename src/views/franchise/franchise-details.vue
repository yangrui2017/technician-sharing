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
          <div class="leftdiv">2020年6月</div>
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
          <div class="listtextright detailed">122</div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">订单总额</div>
          <div class="listtextright detailed">30021￥</div>
        </div>
      </div>
      <div class="listdiv">
        <div class="listtitle">
          <div>2020-06-29 15:48:14</div>
          <div class="orderid">订单编号：2019302930323223159</div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">佣金：213</div>
          <div class="listtextleft detailed">项目金额：26.7</div>
          <div class="listtextleft detailed">会员：挑剔</div>
          <div class="listtextleft detailed">项目名称： 外观简洗</div>
        </div>

      </div>
      <div class="listdiv">
        <div class="listtitle">
          <div>2020-06-29 15:48:14</div>
          <div class="orderid">订单编号：2019302930323223159</div>
        </div>

        <div class="listtext">
          <div class="listtextleft detailed">佣金：213</div>
          <div class="listtextleft detailed">项目金额：26.7</div>
          <div class="listtextleft detailed">会员：挑剔</div>
          <div class="listtextleft detailed">项目名称： 外观简洗</div>
        </div>

      </div>

    </div>

    <div class="footer">----------------已显示所有记录----------------</div>

  </div>
</template>

<script>
import { Tab, Tabs, Col, Row, Button, Popup, DatetimePicker, NavBar } from 'vant'
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
      nickname: '',
      headerimg: '',
      sharenumber: '20',
      list: []

    }
  },
  created () {

  },
  mounted () {
    var _that = this

  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/franchise-partner'
      })
    },
    onConfirm (time) {
      alert(time)
      this.value = time
      this.showPicker = false
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
