<template>
   <div class='layoutSlider'>
        <div class='leftLogo'>
            <img src="../../assets/img/logo_admin.png" alt="">
        </div>
         <el-menu
         router
      style="border-right: 1px solid #353b4e"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
       <!-- 首页 -->
       <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
      <el-submenu index='1'>
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/commont">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
      <el-submenu index='2'>
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>粉丝管理</span>
        </template>
          <el-menu-item index="/home/graData">图文数据</el-menu-item>
          <el-menu-item index="/home/fanprof">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanImg">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanList">粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item index="/home/account">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
   </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.layoutSlider{
    width: 200px;
    height: 100vh;
    background: #323745;
    .leftLogo{
        padding: 15px 0;
        text-align: center;
        img {
            height: 30px
        }
    }
}

</style>
