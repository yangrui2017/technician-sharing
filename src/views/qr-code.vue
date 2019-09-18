<template>
	<div class="box">
		<header>
			<img :src="headerimg" class="headerimg" />
			<div class="header">{{nickname}}</div>
		</header>
		<div class="container">
			<h3>{{operable.name}}</h3>
            <div>
				<div class="van-cell-group__title">二维码</div>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="公众号" name="1"> <img src='../assets/jishi.jpg' class="imgurl"/></van-collapse-item>
                    <van-collapse-item title="小程序" name="2"> <img src='../assets/technician.jpg' class="imgurl"/></van-collapse-item>
                </van-collapse>
			</div>
			<!-- <div>
                <div class="van-cell-group__title">进行中</div>
                <div class="van-cell-group van-hairline--top-bottom">
                    <div class="van-cell van-cell--clickable van-cell--large">
                        <i class="van-icon van-icon-coupon-o van-cell__left-icon"></i>
                        <div class="van-cell__title"><span>Dist 邀请合作伙伴2</span></div>
                        <div class="van-cell__value"><span> </span></div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                        </div>
                        </div>
                        </div> -->
		</div>

	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				operable: "",
				nickname: "",
                headerimg: "",
                activeNames: [],

			}
		},
		mounted() {
			var _that = this;
			_that._data.headerimg = JSON.parse(localStorage.getItem("userinfo")).headimgurl;
			_that._data.nickname = JSON.parse(localStorage.getItem("userinfo")).nickname;
		},
		methods: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.box {
		width: 100%;
		height: 100%;
	}
	
	header {
		width: 100%;
		background: #25034d;
		height: 150px;
	}
	
	.header {
		float: left;
		color: white;
		line-height: 150px;
		text-indent: 2em
	}
	
	.headerimg {
		margin-left: 20px;
		width: 20%;
		float: left;
		margin-top: 40px;
		border-radius: 50%;
	}
	
	.container {
		padding: 20px;
		text-align: left;
	}
	
	.van-cell-group__title {
		margin-top: 2vh;
		/* padding: 5px 5px 5px; */
		font-weight: bold;
		color: darkblue;
		text-align: left;
		background-color: whitesmoke;
		/* box-shadow: 5px 6px 8px 0px rgba(56, 56, 56, 0.21); */
	}
    .imgurl{
        width: 80%;
        margin-left: 10%
    }
</style>