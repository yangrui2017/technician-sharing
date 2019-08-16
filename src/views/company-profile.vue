<template>
  <div class="box">
			<h2>{{name}}</h2>
			<p>{{text}}</p>
      	<p>{{text2}}</p>
	</div>
</template>

<script>
export default {
  data () {
    return {
      name:'公司简介',
      text:'上海联产电子科技有限公司成立于2003年，是一家专注于汽车后市场移动O2O服务平台的高新科技企业。',
      text2:'致力于搭建全国最大的移动互联网洗车服务平台“E帮洗车”，为广大车主提供24小时预约上门洗车、到店洗车等个 性化服务。 公司集产品研发、汽车美容、无水洗车等综合服务为一体，以节能环保为核心经营理念， 利用互联网服务平台，结合科技创新技术，将洗车服务业实现全新的升级，为车主提供随时随地、随叫随到的专业汽车服务。 公司产品采用美国RAIN-X无水洗车液环保技术， 真正意义上实现了不浪费一滴水的无水洗车， 最大程度上降低城市水浪费、水污染问题，并充分利用移动互联网的共享、碎片化特征，使城市人车生活更美好， 为国家环保事业贡献一份力量。'
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
