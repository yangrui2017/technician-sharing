<template>
  <div class="box">
    <van-nav-bar title="使用帮助"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <van-steps direction="vertical"
               :active="0">
      <van-step>
        <h3>管理技师</h3>
      </van-step>
      <van-step>
        <h3>管理技师</h3>
      </van-step>
      <van-step>
        <h3>管理技师</h3>
      </van-step>
    </van-steps>

  </div>
</template>

<script>
import { NavBar, Icon, Step, Steps } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: 4,

    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/franchise-partner'
      })
    }


  },
  components: {

    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-steps': Steps,
    'van-step': Step

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
.van-cell__title {
  text-align: left;
  text-indent: 2em;
}
.cells i {
  color: black;
}
.box {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
}

header {
  width: 100%;
  background: rgb(41, 89, 233);
  height: 190px;
}
.headerimg {
  width: 80px;
  border-radius: 50%;
}

.header {
  color: white;
  line-height: 40px;
  text-align: center;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
.detailed {
  line-height: 60px;
  color: white;
  font-size: 14px;
}
</style>
