<template>
	<div class="box">
		<header>
			<img :src="headerimg" class="headerimg" />
			<div class="header">{{nickname}}</div>
		</header>
		<div class="container">
			<h3>{{operable.name}}</h3>
			<div>{{operable.description}}</div>
			<div>
				<div class="van-cell-group__title">活动奖励</div>
				<van-cell-group>
					<van-cell title="积分" :value="operable.points" />
					<van-cell title="优惠劵" value="内容" />
				</van-cell-group>

			</div>
			<div>
				<div class="van-cell-group__title">被邀请者奖励</div>
				<van-cell-group>
					<van-cell title="积分" :value="operable.usr_points" />
					<van-cell title="优惠劵" value="内容" />
				</van-cell-group>
			</div>
            <div>
				<div class="van-cell-group__title">活动海报</div>
               <van-collapse v-model="activeNames">
                    <van-collapse-item title="二维码" name="1"> 
						<img :src="imgurl" class="imgurl"/>
						</van-collapse-item>
                   	
                </van-collapse>
				<van-cell title="二维码有效期" :value="effectivedate" /> 
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
				list: [],
				imgurl: "",
				effectivedate:""

			}
		},
		mounted() {
			var _that = this;
			_that._data.headerimg = JSON.parse(localStorage.getItem("userinfo")).headimgurl;
			_that._data.nickname = JSON.parse(localStorage.getItem("userinfo")).nickname;
			_that._data.operable = JSON.parse(sessionStorage.getItem("operable")); //获取菜单并显示
			_that.$http.post(_that.$api+"/wx/event/user_event/create/", {           
            "event_id":_that._data.operable.id,
            "openid": localStorage.getItem("openids")
    		},{headers: {'Content-Type': 'application/json'}})
			.then(function(response) {
				console.log(response)
				 _that._data.imgurl=response.data.event_qr.qr_url;
				 _that._data.effectivedate=response.data.event_qr.expire_date;
			})
			.catch(function(error) {
			console.log(error);
			});
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