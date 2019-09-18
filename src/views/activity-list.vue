<template>
	<div class="box">
		<header>
			<img :src="headerimg" class="headerimg" />
			<div class="header">{{nickname}}</div>
		</header>
		<div class="container">
			<div>
				<div class="van-cell-group__title">所有活动</div>
				<div class="van-cell-group van-hairline--top-bottom">
					<div v-for="(item,index) in list" :key="index" @click="operable(index)" class="van-cell van-cell--clickable van-cell--large">
						<i class="van-icon van-icon-todo-list-o van-cell__left-icon"> </i>
						<div class="van-cell__title">
							<span>{{item.name}}</span></div>
						<div class="van-cell__value">
							<span> </span>
						</div>
						<i class="van-icon van-icon-arrow van-cell__right-icon">
                                </i>
					</div>

				</div>

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
				nickname: "",
				headerimg: "",
				activeNames: ['1'],
				list: []

			}
		},
		mounted() {
			var _that = this;

			let formData = new FormData();
				_that._data.headerimg = JSON.parse(localStorage.getItem("userinfo")).headimgurl;
				_that._data.nickname = JSON.parse(localStorage.getItem("userinfo")).nickname;
				var unionid = JSON.parse(localStorage.getItem("userinfo")).unionid;
				formData.append("unionid", unionid); // 'file' 可变 相当于 input 表单的name 属性
				_that.$http.post(_that.$api + "/wx/event/user_event/list/", formData, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					})
					.then(function(response) {
						console.log(response)
						if(response.data.member_type.WorkerMini == false) {
							alert("当前没有活动")
						} else {
							for(var i = 0; i < response.data.event[1].length; i++) {
								_that._data.list.push(response.data.event[1][i])
							}

						}

					})
					.catch(function(error) {
						console.log(error);
					});
		},
		methods: {
			operable(index) {
				sessionStorage.setItem("operable", JSON.stringify(this.list[index])); //保存当前点击菜单
				this.$router.push({
					path: "/tech-content"
				})
				// window.location.href="http://wx.upctech.com.cn/worker/share-details";

			}
		}
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
	
	.van-cell-group__title {
		margin-top: 2vh;
		/* padding: 5px 5px 5px; */
		font-weight: bold;
		color: darkblue;
		text-align: left;
		background-color: whitesmoke;
		/* box-shadow: 5px 6px 8px 0px rgba(56, 56, 56, 0.21); */
	}
</style>