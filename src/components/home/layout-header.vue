<template>
  <el-row type='flex' justify='space-between' align='middle'>
     <!-- 左侧 -->
     <el-col :span='6'>
        <i class='el-icon-s-unfold'></i>
        <span class='header-title'>江苏传智播客教育有限公司</span>
     </el-col>
     <!-- 右侧 -->
     <el-col :span='4'>
           <img src="../../assets/img/avatar.jpg" alt="" class='header-img'>
        <!-- 下拉菜单 -->
         <el-dropdown trigger="click" style="margin-left:10px">
            <span class="el-dropdown-link">
              用户<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>1</el-dropdown-item>
              <el-dropdown-item>2</el-dropdown-item>
              <el-dropdown-item>3</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
     </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
 .header-img {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   vertical-align: middle
 }
 .el-icon-s-unfold {
   font-size: 22px;

 }
 .header-title {
   margin-left: 5px;
    vertical-align: top;
 }

</style>
