<template>
  <el-row type='flex' justify='space-between' align='middle' style="height:60px">
     <!-- 左侧 -->
     <el-col :span='6'>
        <i class='el-icon-s-unfold'></i>
        <span class='header-title'>江苏传智播客教育有限公司</span>
     </el-col>
     <!-- 右侧 -->
     <el-col :span='4'>
           <!-- 如果用户没有头像，显示默认头像，有头像显示头像 -->
           <img :src="userInfo.photo?userInfo.photo:defaultPic" alt="" class='header-img'>
        <!-- 下拉菜单 -->
         <el-dropdown trigger="click" style="margin-left:10px" @command="handleCommand">
            <span class="el-dropdown-link">
              {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='account'>账户信息</el-dropdown-item>
              <el-dropdown-item command='gitAddress'>Github地址</el-dropdown-item>
              <el-dropdown-item command='lgout'>退出</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
     </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultPic: require('../../assets/img/avatar.jpg')// 默认头像
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    handleCommand (key) {
      // 点击账户信息
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'gitAddress') {
        // 去Github
        location.href = 'https://github.com/shuiruohanyu/82heimatoutiao'
      } else {
        // 退出系统
        localStorage.clear()//  退出完成之前删除token
        // 跳到登录页面
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
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
