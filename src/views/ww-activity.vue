<template>
	<div class="box">
		<header>
			<img :src="headerimg" class="headerimg" />
			<div class="header">我要找到更多技师！</div>
		</header>
		<div class="container">
            <div class="headerh3">
		<div class="text">长按海报保存图片，然后转发到朋友圈或微信群中：</div>
            </div>
           	<van-swipe :autoplay="3000" indicator-color="white" >
				<van-swipe-item v-for="(items,index) in imgurl" :key="index"><img :src="items" class="imgurl"/></van-swipe-item>
			</van-swipe>
              <div class="person"> 每位好友加盟技师，您可以获得 {{operable.points}} 积分 </div>  
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
				imgurl: [],
				effectivedate:""

			}
		},
		mounted() {
			var _that = this;
			let formData = new FormData();
			setTimeout(function(){
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
							for(var i = 0; i < response.data.event[1].length; i++) {
                                if(  response.data.event[1][i].event_type=="WW"){
                                    _that._data.operable=response.data.event[1][i];
                                    _that.$http.post(_that.$api+"/wx/event/user_event/create/", {           
                                    "event_id":_that._data.operable.id,
                                    "openid": localStorage.getItem("openids")
                                    },{headers: {'Content-Type': 'application/json'}})
                                    .then(function(response) {
                                      	var data=response.data.event_qr.qr_url;
										data=_that.trim(data);
										 _that._data.imgurl=data.split(",");
                                        _that._data.effectivedate=response.data.event_qr.expire_date;
                                    })
                                    .catch(function(error) {
                                    console.log(error);
                                    });
                                    break; 
                                }
                              
                            }
                            
					})
					.catch(function(error) {
						console.log(error);
					});
					},800)
			
		},
		methods: {trim(url) {
				url = url.replace(/\]/g,'');
				url = url.replace(/\[/g,'');
				url = url.replace(/\'/g,'');
				return url
			}}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.box {
		width: 100%;
		height: 100%;
        background: #ffd800;  
		overflow: scroll;
	}
	
	header {
		width: 100%;
		height: 150px;
        overflow: hidden;
	}
	
		.header {
		float: left;
		color: #5b4827;
        font-size: 19px;
		line-height: 200px;
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
		text-align: left;
        width: 90%;
        background: white;
        margin-left: 5%;
        border-radius: 20px;
		margin-bottom: 20px;
	}
    .headerh3{
        background: #fe3a3b;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
	h3,.text{
        text-align: center;
        font-size:28px;
        line-height: 60px;
        margin:0;
        color: white;
    }
   .text {
         line-height:40px;
        font-size:20px;
       
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
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .person{
        line-height:60px;
        text-align: center;
        width: 90%;
        margin-left: 5%;
        border-top: 1px dashed #fed800;
    }
</style>