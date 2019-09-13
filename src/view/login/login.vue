<template>
  <div id="login">
    <div class="login-title">
      <p>Welcome成果收集系统</p>
    </div>
    <div class="login-container clearfix">
      <div class="login-left">

      </div>
      <div class="login-right">

        <el-form :model="userData" status-icon :rules="rules" ref="userData" label-width="0px" class="demo-ruleForm">
          <el-form-item class="login-input" label="" prop="userName">
            <el-input type="text" v-model="userData.userName" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item class="login-input" label="" prop="password">
            <el-input type="password" v-model="userData.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="isAdmin">
            <el-radio v-model="userData.isAdmin" :label="0">学生</el-radio>
            <el-radio v-model="userData.isAdmin" :label="1">管理员</el-radio>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              label="记住账号" v-model="remember"
              style="text-align: left">
            </el-checkbox>
          </el-form-item>
          <el-form-item class="button-submit">
            <el-button type="primary" @click="submitUser('userData')">登录</el-button>
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                userData: {
                    userName: '',
                    password: '',
                    isAdmin: 0
                },
                remember: false,
                rules: {
                    userName: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    isAdmin: [
                        // { validator: validateCode, trigger: 'submit' },
                        {required: true, message: '请选择身份', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 登录
            submitUser(userData) {

                if (this.userData.code !== this.identifyCode) {
                    this.$message.error('验证码错误')
                    this.refreshCode();
                } else {
                    this.$refs[userData].validate((valid) => {
                        if (valid) {
                            let isTrue = false;
                            if(this.userData.isAdmin === 1){
                                isTrue = true;
                            }
                            let data = {
                                userName: this.userData.userName,
                                password: this.userData.password,
                                isAdmin: isTrue,
                                remember: this.remember
                            }
                            // this.$message("jjj");
                            this.$store.dispatch('accountLoginSubmit', data).then((res) => {

                                if (res.status) {

                                    Msg.success('登录成功');

                                    // this.$router.push({path: '/admin/overdueFile'})
                                    sessionStorage.setItem('userName', this.userData.userName);
                                    // this.$router.push({path: '/admin/mainIndex',name:'admin',params:'456'})
                                    if(data.isAdmin === 0){
                                        this.$router.push({path: '/clientHome'});
                                    } else {
                                        this.$router.push({path: '/adminHome'});
                                    }


                                } else {
                                    this.refreshCode();
                                    Msg.error("登陆失败");
                                }
                            })


                        } else {
                            return false;
                        }
                    });
                }

            },
            // 重置
            reset(userData) {
                this.$refs[userData].resetFields();
            },
            getUser() {
                this.userData.userName = Auth.getAccountPwd().userName || '';
                this.userData.password = Auth.getAccountPwd().password || '';
                if(Auth.getISAdmin()){
                    this.userData.isAdmin = 1;
                } else {
                    this.userData.isAdmin = 0;
                }
                this.remember = Auth.getAccountPwd().remember || false;
            },
        }
    }
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
    background: #40aaf4 url("../../assets/imgs/bg-login.png") no-repeat fixed;
  }

  .login-container {
    width: 57%;
    height: 336px;
    left: 22%;
    top: 20%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 27.55px 1.45px rgba(0, 0, 0, 0.35);
    position: absolute;
    z-index: 9;
  }

  .login-left {
    width: 40%;
    background: url("../../assets/imgs/log-login.png") no-repeat center;
    height: 100%;
    float: left;
  }

  .login-right {
    height: 100%;
    float: right;
    width: 60%;
  }

  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }


  .demo-ruleForm{
    padding: 49px 0px 0px 7px;
  }



  .login-input >>> .el-input__inner{
    border-color: #b9bedc;
    border-top: none;
    border-left: none;
    border-right: none;
    padding: 0 10px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    width: 290px;
  }
  .el-input {
    width: auto;
  }


  .button-submit >>> .el-button{
    width: 291px;
    border-radius: 20px;
    height: 35px;
    line-height: 11px;
  }

  .login-title {
    position: absolute;
    top: 6%;
    left: 8%;
    font-size: 29px;
    font-family: "Microsoft YaHei";
    color: rgb(251, 249, 254);
    line-height: 1.2;
  }

  .el-form-item {
    margin-bottom: 15px;
  }


</style>



