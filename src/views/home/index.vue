<template>
  <div class="home">
      <el-container>
          <!-- 侧边栏 -->
          <el-aside class='aside'>
              <layout-slider></layout-slider>
          </el-aside>
          <el-container>
                <!-- 头部 -->
                <el-header></el-header>
                <!-- 容器 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
          </el-container>

      </el-container>
  </div>
</template>

<script>
import layoutSlider from '../../components/home/layout-aslider'
export default {

  components: {
    'layout-slider': layoutSlider
  }
}
</script>
<style lang="less" scoped>
.aside {
    // width: 200px !important;
    overflow: hidden
}
</style>
