<template>
  <el-card>
      <break-crumb slot='header'>
          <template slot='title'>账户信息</template>
      </break-crumb>
      <el-form label-width='100px'>
          <el-form-item label='账户信息'>
              <el-input style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label='简介'>
              <el-input style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label='邮箱'>
               <el-input style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label='手机号'>
              <el-input style='width:300px'></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type='primary'>保存信息</el-button>
          </el-form-item>
          <div class='photo'></div>
      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.el-form {
    margin: 20px 100px !important;
    position: relative;
    .photo {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 1px solid #ccc;
        position: absolute;
        right: 250px;
        top: 0px

    }
}

</style>
