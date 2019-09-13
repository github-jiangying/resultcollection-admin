<template>
  <el-container>
    <el-header>
      <com-header></com-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
    import comHeader from "./comHeader";
    export default {
        name: "container",
        components: {
            comHeader
        }
    }
</script>

<style scoped lang="scss">
  .el-container{
    background: url("../../assets/imgs/bg-main.png") repeat-y ;
  }

  .el-header {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
    box-shadow: 0px 0px 6.6px 3.4px rgba(0, 0, 0, 0.35);
    /*border-bottom: solid 1px #e6e6e6;*/
  }




  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    height: 1500px;
    box-shadow: 4.243px 4.243px 12px 0px rgba(0, 0, 0, 0.35);
    margin-top: 2px;
  }




  body > .el-container {
    margin-bottom: 40px;
  }

</style>
