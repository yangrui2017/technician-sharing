<template>
  <div class="box">
    <h3>加入E帮车服</h3>
    <div class="listbox">
      <div @click="listbut1()"
           class="list">
        <img src="../assets/menu7 (1).jpg"
             class="img" />
        <p>还在为打工工资不高苦恼吗？还在为工作不自由压抑郁抑吗？现在，机会来了。无需口才，无需文凭，加入“E”帮洗车技师，即可月入过万 ，“立即申请”，即可加入！点击加入技师
        </p>
      </div>
      <div @click="listbut2()"
           class="list">
        <img src="../assets/menu7 (2).jpg"
             class="img" />
        <p>“0”元即可创业 半年即可回本 无需人工 24小时营业 真正实现“睡后收入” 最省心省力的创业机会 。点击加入代理</p>

      </div>
      <div @click="listbut3()"
           class="list">
        <img src="../assets/menu7 (3).jpg"
             class="img" />
        <p>想当老板？ 想拥有副业？想实现财务自由？想要收入不打烊？选择“E”帮洗车，开启你的财富人生。点击加入加盟伙伴</p>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    listbut1 () {
      this.$router.push({
        path: '/worker-examine'
      })
    },
    listbut2 () {
      this.$router.push({
        path: '/agent-examine'
      })
    },
    listbut3 () {
      this.$router.push({
        path: '/franchise-examine'
      })
    },
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  background: #f2f3f5;
  height: 100%;
}
h3 {
  background: #ffda44;
  margin: 0;
  line-height: 60px;
  width: 100%;
}
.listbox {
  background: #f2f3f5;
  padding-bottom: 20px;
}
.list {
  margin-top: 30px;
  width: 90%;
  margin-left: 5%;
  border: none;
  border-radius: 10px;
  box-shadow: 4px 4px 4px #808080;
}
.list .img {
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.list p {
  margin: 0 auto;
  height: 100%;
  padding: 0 2%;
  line-height: 24px;
  text-align: left;
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
}
</style>
