<template>
    <div class="box">
        <h3>{{content.title}}</h3>
        <p>新闻编号{{content.news_id}}</p>
        <div v-html="content.content" class="content123"></div>
    </div>
</template>
<script>
    export default {
        name: 'index',
       
        data() {
            return {
                content:{}
            }
        },
        methods: {},
        computed: {
           
        },
        mounted() {
            var _that=this;
         	_that.$http.get(_that.$api + "/wx/event/choose_template/get_content?news_id=5",)
					.then(function(response) {
                        _that._data.content=response.data
					})
					.catch(function(error) {
					});
        },
        watch: {}
    }
</script>
<style>
.box{
    width: 100%;
}
.content123 img{
    width: 100%
}
</style>