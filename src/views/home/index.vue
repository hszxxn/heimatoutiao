<template>
  <div class="home">
      <el-container>
          <!-- 侧边栏 -->
          <el-aside class='aside'>左侧</el-aside>
          <el-container>
                <el-header>头部</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
          </el-container>

      </el-container>
  </div>
</template>

<script>

export default {

  components: {

  }
}
</script>
<style lang="less" scoped>
   .aside {
      width: 300px;
      height: 100vh;
      // background: red;
    }
</style>
