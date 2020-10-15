<template>
  <div class="box">
    <van-nav-bar title="本月技师洗车详情"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="listdivs">
      <van-cell title="某某技师"
                is-link
                value="110单" />
      <van-cell title="某某技师"
                is-link
                value="110单" />
      <van-cell title="某某技师"
                is-link
                value="110单" />
      <van-cell title="某某技师"
                is-link
                value="110单" />

    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, CellGroup } from 'vant'
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
    'van-cell-group': CellGroup,
    'van-cell': Cell

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

.footer {
  margin-top: 20px;
  font-size: 12px;
  color: #7d7e80;
  line-height: 30px;
  text-align: center;
}
</style>
