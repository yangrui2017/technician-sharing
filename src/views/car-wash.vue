<template>
  <div class="box">
			<h2>{{name}}</h2>
			<p>{{text}}</p>
	</div>
</template>

<script>
export default {
  data () {
    return {
      name:'洗车服务',
      text:'上门洗车，是目前国际上解决洗车的方案，洗车的效果完全超过传统洗车房洗出的效果。无论是在车身亮度、反差、层次方面，还是在光泽度、手感等方面，都有的表现。上门洗车，不要车主专程将车开到指定的地方，这样就可以节省了车主大量的时间。洗车效果：车洁士洗车效果良好，洗车、养护、打蜡一次性完成，洗完后更新更亮，不仅洗车整体效果要比传统高压水枪好很多，而且具有养护的功能，可以避免传统高压水枪洗车时造成有损漆面、漆面老化等弊端。'
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

			
			.box {
				width: 100%;
				height: 100%;
				background: url(../assets/fuwu.png);
				background-size: 100% 100%;
				position: relative;
				overflow: hidden;
			}
			
			h2 {
				text-align: center;
			}
			
			p {
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
			}
</style>
