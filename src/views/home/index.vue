<template>
  <div class="home">
      <el-container>
          <!-- 侧边栏 -->
          <el-aside style='width:200px' class='aside'>
              <layout-slider></layout-slider>
          </el-aside>
          <el-container>
                <!-- 头部 -->
                <el-header>
                  <layout-header></layout-header>
                </el-header>
                <!-- 容器 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
          </el-container>

      </el-container>
  </div>
</template>

<script>

export default {
}
</script>
<style lang="less" scoped>
.aside {
    // width: 200px !important;
    overflow: hidden
}
</style>
