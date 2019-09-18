<template>
  <div class='login'>
      <el-card class="box-card">
          <div style='text-align:  center'>
              <img src='../../assets/img/logo_index.png' style='height:40px'>
          </div>
          <el-form style="margin-top:20px" :rules='loginRules' :model='loginData' ref='rulesForm'>
               <el-form-item prop='mobile'>
                   <!-- 手机号 -->
                   <!-- 数据校验 -->
                   <el-input v-model='loginData.mobile'   placeholder='请输入手机号'></el-input>
               </el-form-item>
                <el-form-item prop='code'>
                   <!-- 验证码 -->
                   <el-input style="width:65%" v-model='loginData.code' placeholder="请输入验证码"></el-input>
                   <!-- 发送验证码 -->
                   <el-button plain style="width:30%;float:right">发送验证码</el-button>
               </el-form-item>
               <el-form-item prop='agree'>
                    <!-- 同意 -->
                    <el-checkbox label="我已阅读并同意用户协议和隐私条款" v-model='loginData.agree' name="type"></el-checkbox>
               </el-form-item>
                <el-form-item>
                    <!-- 登录 -->
                     <el-button type="primary" style="width:100%" @click="submitRules">登录</el-button>
                </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('请勾选同意'))
    }
    return {
      loginData: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意
      },
      //   验证规则
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数', trigger: 'blur' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    submitRules () {
    //   校验整个表单的规则
      this.$refs.rulesForm.validate(isOk => {
        if (isOk) {
          console.log('校验成功')
          //   发送请求，验证登录信息
          this.$http({
            url: '/authorizations',
            method: 'post',
            data: this.loginData
          }).then(result => {
            // console.log(result.data.data.token)
            // 把后端接口返回的令牌信息存入localStorage中
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // console.log(err.message)
            this.$message({
              showClose: true,
              message: '您的手机号或验证码输入错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
   .login {
       background-image: url('../../assets/img/login_bg.jpg');
       height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
       background-size: cover
   }
   .box-card {
       height: 340px;
       width: 440px;

   }
</style>
