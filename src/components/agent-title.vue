<template>
  <div class="header">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="orders-o">
        <router-link to="/agent-application">代理申请</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="more-o">
        <router-link to="/agent-rules">代理规则</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="hot-o">
        <router-link to="/agent-poster">代理海报</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="manager-o">
        <router-link to="/agent-reward">代理奖金</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  }
}
</script>
<style scoped>
a {
  color: white;
}
.van-tabbar--fixed {
  background: #f34230;
}
</style>
