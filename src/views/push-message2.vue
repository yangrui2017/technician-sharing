<template>
  <div class="box">
    <h3>如何正确的洗车？有哪些洗车禁忌？</h3>
    <p></p>
    <div class="content123">

      洗车就像人洗脸，谁还能不会?不过简单的洗车还是有一门“细致的学问”，洗得好天天开新车，洗得不好车漆可能三五年就发暗、发糙最后龟裂，可见洗车技巧十分重要。<br>
      <h4> 洗车要点：</h4>

      <h5>1.多久洗一次车？</h5>

      一般来说正常情况下两周洗一次如果脏的话就一周洗一次，或者抹一遍，雨雪天气的时候，因为雨水中含有酸性，如果不及时冲洗，很容易影响车漆的光泽度。下雪的时候路上可能会有融雪剂，融雪剂残渣会严重损伤车漆表面及底盘，所以建议雨雪天气开出去之后是应该清洗的。
      <h5>2.车身有沙泥该怎么洗车？</h5>

      车身溅上沙土泥土是经常有的事情，但是大家注意因为沙土里面可能含有一些伤车的小碎石，所以应该这样正确的清洗：从上往下洗，水带着泥土从上往下流下来，冲掉沙土后，要用海绵洗车，毛巾纤维硬，不柔和，容易伤害到车身的烤漆，造成划痕。

      <h5>3.洗完之后车门缝要擦干</h5>

      冬天寒冷，北方城市更不用说了，可以说是滴水成冰。这种时候当我们洗完车，不仅要把车身擦干，尤其要注意车门上的密封条的缝隙，都要擦干。不然很可能出现车门被冻住的现象，那就麻烦了。

      <h5>4.洗完车后钥匙孔要擦干</h5>

      这个是大家很容易忽略的问题，和上述同样的道理，如果不把钥匙孔擦干的话，钥匙孔被冻住那又是个大麻烦事，因为现在很多车都标配遥控器，一般都不用钥匙开车，洗车后也想不起来擦钥匙孔，但万一哪天遥控器失灵，要用钥匙开门，被冻住了咋开？

      <h5>5.洗完车后雨刷器要擦干</h5>

      我们洗车的时候，雨刷器尽量要远离玻璃，放回的时候记住一定要擦干胶条。不然很容易造成雨刷器的胶条与玻璃粘在一起的情况，而这时恰好启动雨刷器，很容易造成雨刷器的电机烧坏。

      <h4>洗车注意事项：</h4>
      <div>1、忌在发动机彻底冷却下前洗车，不然会使发动机过早老化;</div>
      <div>2、忌在寒冷的天气下洗车，一旦水结冰会引起油漆涂膜破裂。</div>
      　　 <div>3.忌乱用抹布擦车身，若要擦拭，应用海绵，擦试时应顺着水流方向，自上而下擦。</div>
      <div>4.忌乱用去污剂，车上的污渍，如沥青、油渍，鸟类、昆虫粪等等，应用海绵蘸少许煤油或汽油轻轻擦拭，然后在擦过的地方打上抛光膏，使其光泽如初。</div>
      <div>5.忌用沾有油污的脏手触摸表面，这样容易在漆面上留下盂或使漆面过早褪色。</div>
      <div>6.如果轮胎或轮毂钢圈上沾了油污，先用除垢剂进行清洗，然后再喷上轮胎保养剂。</div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'index',

  data () {
    return {
      content: {}
    }
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  },
  computed: {

  },
  mounted () {
    // var _that = this
    // var news_id = _that.getQueryString('news_id')

    // _that.$http.get(_that.$api + '/wx/event/choose_template/get_content?news_id=' + news_id)
    //   .then(function (response) {
    //     console.log(response)
    //     _that._data.content = response.data
    //   })
    //   .catch(function (error) {
    //   })
  },
  watch: {}
}
</script>
<style>
.box {
  width: 100%;
}
h3 {
  font-size: 25px;
}
.content123 h4,
.content123 h5 {
  text-align: left;
  font-size: 22px;
}
.content123 h5 {
  font-size: 20px;
  margin: 20px 0;
}
.content123 div {
  font-size: 15px;
}
.content123 {
  width: 96%;
  margin-left: 2%;
  font-size: 16px;
  text-align: left;
  line-height: 30px;
  color: black;
}
.content123 img {
  width: 100%;
}
</style>
