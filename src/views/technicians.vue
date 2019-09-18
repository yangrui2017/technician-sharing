<template>
  <div class="box">
      <img src='../assets/hr2.jpg' class="banner"/>
      <h3>加入我们</h3>
      <div class="jointext">
        <p> 我们不急， 但每年都有不错的增长。</p>
        <p> 我们选择先做好对的事儿， 再让资本市场相信。</p>
        <p> 我们很轴， 只想做成一件事：为全行业提供全产业链的知识服务， 成为国内有影响力的平台。</p>
        <p> 我们要凭本事， 赚有情怀的钱。</p>
        <p> 我们简单， 制度把Boss们锁进了笼子， 留下透明平台任你纵情才华。</p>
        <p> 事儿靠谱， 定力足够， 就风雨无阻。</p>
        <p>如果你愿意跟这样一群简单、执着的人一起成就一个影响整个行业的事业， 欢迎加入我们</p>
      </div>
       <div class="joinus">
           <img src="../assets/jishi.jpg" class="imgurl"/>
           <div>加入我们</div>
       </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
   mounted() {
  },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 100%;
    height: 100%;
}
.banner{
    width:100%;
}
.jointext{
    width: 94%;
    margin-left: 3%;
}
p{
   
    text-align: left;
    font-size: 14px;
}
.imgurl{
    width: 30%;
}

</style>
