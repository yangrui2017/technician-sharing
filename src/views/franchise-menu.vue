<template>
  <div class="box">
    <h3>加入E帮车服</h3>
    <div class="listbox">
      <div class="list">
        <p>(如需技师加盟请点击下方按钮)</p>

        <div class="listbut">
          <router-link to="/worker-examine">技师加盟</router-link>
        </div>
      </div>
      <div class="list">
        <p>(如需代理加盟请点击下方按钮)</p>
        <div class="listbut">
          <router-link to="/agent-examine">代理加盟</router-link>
        </div>
      </div>
      <div class="list">
        <p>(如需加盟店加盟请点击下方按钮)</p>
        <div class="listbut">
          <router-link to="/franchise-examine">加盟店加盟</router-link>
        </div>
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
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.listbox {
  padding-top: 50px;
}
.list {
  margin-top: 30px;
}
.list p {
  margin: 0;
  text-align: center;
  font-size: 14px;
}
.listbut {
  width: 50%;
  margin-left: 25%;
  border-radius: 10px;
  line-height: 50px;
  background: #ffda44;
  margin-top: 10px;
}
.listbut a {
  color: black;
  text-decoration: none;
}
</style>
