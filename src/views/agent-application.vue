<template>

  <div class="box">
    <div class="headers">
      <van-row>
        <van-col span="12"><el-button  type="text" class="headertext"><router-link to="/agency-rules" >代理规则</router-link></el-button> </van-col>
        <van-col span="12"> <el-button type="text" class="headertext"><router-link to="/agent-poster">代理海报</router-link></el-button></van-col>
      </van-row>
    </div>
    <img src="../assets/login.png" class="imgurl"/>
      <h2>注册代理</h2>
     <van-tabs  color="#ff976a">
  <van-tab title="个人" >
     <van-cell-group>
        <van-field
            v-model="personal.name"
            required
            label="个人姓名"
            placeholder="请输入姓名"
        /> 
        <van-field
          v-model="personal.contact_phone"
          center
          clearable
           required
          label="手机号码"
          placeholder="请输入手机号码"
        >
          <van-button slot="button" size="small" type="warning" @click="phoneverification()">发送验证码</van-button>
        </van-field>
         <van-field
          v-model="verification"
          center
          clearable
           required
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="warning" @click="verifications()">点击验证</van-button>
        </van-field>
        
         <van-field
            v-model="personal.persion_id"
            required
            label="身份证号"
            placeholder="请输入身份证号"
        /> 
      
        <van-field
            v-model="personal.bank_name"
            required
            label="银行名称"
            placeholder="请输入银行名称"
        /> 
        <van-field
            v-model="personal.bank_account"
            required
            label="银行卡号"
            placeholder="请输入银行卡号"
        /> 
        <van-field
            v-model="personal.bank_acc_name"
            required
            label="开户行名称"
            placeholder="请输入开户行名称"
        /> 
          <van-field
            v-model="personal.agent_type"
            label="代理类型"
            placeholder="个人"
            disabled
        />
        <van-row>
          <van-col span="12"> 
            <a href="javascript:;" class="file">选择身份证正面
              <input type="file" @change="uploads" accept="image/*"/>
            </a>
            <img :src="personal.idcard1" class="imgurl2" v-show="img1"/> 
       </van-col>
         <van-col span="12"> 
            <a href="javascript:;" class="file">选择身份证反面
              <input type="file" @change="uploads2" accept="image/*"/>
            </a>
            <img :src="personal.idcard2" class="imgurl2" v-show="img2"/> 
       </van-col>
        </van-row>
    </van-cell-group>
     <van-button round type="warning" size="normal"   @click="register(personal)">注册代理</van-button>
  </van-tab>
  <van-tab title="公司">
     <van-cell-group>
        <van-field
            v-model="company.company_name"
            required
            label="公司名称"
            placeholder="请输入公司名称"
        />
         <van-field
            v-model="company.contact_phone"
            required
            label="公司号码"
            placeholder="请输入公司号码"
        />
       
        <van-field
            v-model="company.code"
            required
            label="公司代码"
            placeholder="请输入公司代码"
        />
         <van-field
            v-model="company.bank_name"
            required
            label="银行名称"
            placeholder="请输入银行名称"
        /> 
        <van-field
            v-model="company.bank_account"
            required
            label="银行卡号"
            placeholder="请输入银行卡号"
        /> 
        <van-field
            v-model="company.bank_acc_name"
            required
            label="开户行名称"
            placeholder="请输入开户行名称"
        /> 
        <van-field
            v-model="company.agent_type"
            label="代理类型"
            placeholder="公司"
            disabled
        />
          <a href="javascript:;" class="file">选择身份证反面
              <input type="file" @change="uploads3" accept="image/*" />
            </a>
            <img :src="company.license" class="imgurl2" v-show="img3"/> 
    </van-cell-group>
      <van-button round type="warning" size="normal" @click="register(company)">注册代理</van-button>
  </van-tab>
</van-tabs>
    
   
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      img1:false,
      img2:false,
      img3:false,
      verification:"",
      personal:{
        agent_type:"personal",
        name:"",
        person_id:"",
        contact_phone:"",
        idcard1:"",
        idcard2:"",
         bank_name:"",
         bank_acc_name:"",
         bank_account :"",
        
      },
      company:{
        agent_type:"company",
        company_name:"",
         company_id:"",
         city :"",
        companyid_pic:"",
        contact_phone:"",
         bank_name:"",
         bank_acc_name:"",
         bank_account :"",
      }
   
    };
  },
  created() {
  },
  mounted() {
    var urls= window.location.href.split("?")[0];
    var _that = this;
  },
  methods: {
    phoneverification(){
    var _that = this;
    if(  _that._data.personal.contact_phone==""){
         _that.$message({
          message: '号码不能为空',
          type: 'warning'
        });
     }else{
     _that.$http
              .get("https://xcxdev.upctech.com.cn/api/login/getVcodeByWxOpen?tel="+_that._data.personal.contact_phone,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
              .then(rs => { 
                if( rs.data.status==1){
                   _that.$message("消息已发，请注意查收");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
      
    },
    verifications(){
       var _that = this;
    if( _that._data.verification==""){
        _that.$message({
          message: '号码不能为空',
          type: 'warning'
        });
     }else{
      _that.$http
              .get("https://xcxdev.upctech.com.cn/api/login/checkVcode?tel="+_that._data.personal.contact_phone+"&vcode="+_that._data.verification)
              .then(rs => {
                console.log(rs)
              })
              .catch(err => {
                console.log(err);
              });
          }
    },
    register(e){
      console.log(e);
      //  _that.$http
      //          .post(_that.$api+"/wx/img/image/upload/", e)
      //         .then(rs => {
      //           console.log(rs)
      //         })
      //         .catch(err => {
      //           console.log(err);
      //         });
    },
    uploads(e) {
      var _that=this;
      const file = e.target.files[0]; //获取到当前文件对象
      this.imgUrl = URL.createObjectURL(file); // 这是为了显示图片而已， 与上传没有关系（可选）

      // 传递一个 FormData 对象 即可
      let formData = new FormData();
      formData.append("image", file); // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post(_that.$api+"/wx/img/image/upload/", formData)
        .then(rs => {
          alert(123)
           _that._data.personal.idcard1=rs.data.img_url;
            _that._data.img1=true;
          _that.$message("上传成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploads2(e) {
      
      var _that=this;
      const file = e.target.files[0]; //获取到当前文件对象
      this.imgUrl = URL.createObjectURL(file); // 这是为了显示图片而已， 与上传没有关系（可选）

      // 传递一个 FormData 对象 即可
      let formData = new FormData();
      formData.append("image", file); // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post(_that.$api+"/wx/img/image/upload/", formData)
        .then(rs => {
          console.log(rs.data.img_url)
           this._data.personal.idcard2=rs.data.img_url;
           this._data.img2=true;
          this.$message("上传成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploads3(e) {
      
      var _that=this;
      const file = e.target.files[0]; //获取到当前文件对象
      this.imgUrl = URL.createObjectURL(file); // 这是为了显示图片而已， 与上传没有关系（可选）

      // 传递一个 FormData 对象 即可
      let formData = new FormData();
      formData.append("image", file); // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post(_that.$api+"/wx/img/image/upload/", formData)
        .then(rs => {
          console.log(rs.data.img_url)
          this._data.company.license=rs.data.img_url;
          this._data.img3=true;
          this.$message("上传成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headers{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0
}
.headertext a{
  color: white
}

.box {
  width: 100%;
    height: 100%;
    background: white
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    
    margin-top:20px;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.imgurl{
  width: 100%
}
.imgurl2{
      width: 80%;
    height: 85px;
}
.van-button--normal{
  width: 75%;
  margin-top: 20px;
}
</style>
