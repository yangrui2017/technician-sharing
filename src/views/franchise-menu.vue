<template>
  <div class="box">
    <h3>加入E帮车服</h3>
    <div class="listbox">
      <div class="list listbut"
           @click="listbut1()">
        <p>无需文凭，无需口才，收入过万挺简单，点击加入技师
        </p>
      </div>
      <div class="list listbut2"
           @click="listbut2()">
        <p>想月入过万，告别月光族么？点击加入代理</p>

      </div>
      <div class="list listbut3"
           @click="listbut3()">
        <p>E帮洗车加盟伙伴，我们需要你</p>

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
  margin: 0px;
  padding: 0px;
  margin-top: 30px;

  width: 90%;
  margin-left: 5%;
  border-radius: 10px;
  border: none;
  height: 150px;
  box-shadow: 4px 4px 4px #808080;
}

.list p {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  line-height: 30px;
  padding-top: 20px;
  text-align: center;
  font-size: 16px;
}
.listbut {
  background: url("../assets/menu.jpg") no-repeat;
  background-size: 100% 100%;
}
.listbut2 {
  background: url("../assets/menu5.jpg") no-repeat;
  background-size: 100% 100%;
}
.listbut3 {
  background: url("../assets/menu3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
