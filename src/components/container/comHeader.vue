<template>
  <div class="header clearfix">
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-demo" mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="/adminHome" v-show="infoData.isAdmin">
        <span class="header-title">主页</span>
      </el-menu-item>
      <el-menu-item index="/clientHome" v-show="!infoData.isAdmin">
        <span class="header-title">主页</span>
      </el-menu-item>
      <el-menu-item index="/entryInfo">录入获奖信息</el-menu-item>
      <el-menu-item index="/personal" v-show="!infoData.isAdmin">个人中心</el-menu-item>
    </el-menu>
    <div class="search">
      <el-input
        class="input-search"
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>
    </div>
    <div class="nav-info clearfix">
      <div class="info-username">
        <span v-show="!infoData.isAdmin">学生： {{infoData.name}}</span>
        <span v-show="infoData.isAdmin">管理员：{{infoData.name}}</span>
      </div>
      <div class="logout" @click="logout">
        退出
      </div>
    </div>
    <div class="line">

    </div>
  </div>
</template>

<script>
    import {Auth} from "../../store/user/auth";

    export default {
        name: "comHeader",
        data() {
            return {
                infoData: {
                    name: '张大大',
                    isAdmin: false
                },
                input: ''
            };
        },
        created(){
          // this.getUser();
        },
        methods: {
            getUser(){
             this.infoData.name =  Auth.getUserInfo();
             this.infoData.isAdmin = Auth.getISAdmin();
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                this.$confirm('确认退出登录？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$store.dispatch('accountLogoutSubmit').then((res) => {
                        this.$router.push({path: '/login'})
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                })
            }
        }
    }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 100%;
    border-bottom: solid 1px #e6e6e6;
  }

  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }

  .el-menu.el-menu--horizontal {
    width: 60%;
    float: left;
  }

  .header-title {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    color: rgb(57, 131, 247);
  }

  .search{
    float: left;

  }

  .nav-info {
    width: 20%;
    height: 100%;
    float: right;
    padding-right: 20px;
  }

  .info-username {
    float: left;
    cursor: pointer;
  }

  .logout {
    float: right;
    cursor: pointer;
  }

  .input-search >>> .el-input__inner {
    border-radius: 19px;
    width: 152px;
  }

</style>
