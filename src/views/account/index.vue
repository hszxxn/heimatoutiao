<template>
  <el-card>
      <break-crumb slot='header'>
          <template slot='title'>账户信息</template>
      </break-crumb>
      <el-form label-width='100px'>
          <el-form-item label='名称'>
              <el-input style='width:300px' v-model='formData.name'></el-input>
          </el-form-item>
          <el-form-item label='简介'>
              <el-input style='width:300px' v-model='formData.intro'></el-input>
          </el-form-item>
          <el-form-item label='邮箱'>
               <el-input style='width:300px' v-model='formData.email'></el-input>
          </el-form-item>
          <el-form-item label='手机号'>
              <el-input style='width:300px' v-model="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type='primary'>保存信息</el-button>
          </el-form-item>
          <div class='photo'>
              <img :src="formData.img?formData.img:defaultImg" alt="">
          </div>
      </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        img: ''
      },
      defaultImg: require('../../assets/img/default.jpg')
    }
  },
  methods: {
    //    获取用户信息
    getUserInfo () {
      this.$http({
        url: 'user/profile'
      }).then((result) => {
        console.log(result)
        this.formData.name = result.data.name
        this.formData.intro = result.data.intro
        this.formData.email = result.data.email
        this.formData.mobile = result.data.mobile
        this.formData.img = result.data.photo
      })
    }
  },
  created () {
    this.getUserInfo()
  }
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
        top: 0px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

</style>
