<template>
  <el-card>
      <break-crumb slot='header'>
            <template slot='title'>
                发布文章
            </template>
      </break-crumb>
      <el-form label-width="100px" :model='formdata' :rules='rules' ref='ruleForm'>
          <el-form-item label='标题' prop='title'>
               <el-input style='width:400px' v-model='formdata.title'></el-input>
          </el-form-item>
          <el-form-item label="内容" prop='content'>
               <el-input type="textarea" style='width:800px' v-model='formdata.content'></el-input>
          </el-form-item>
          <el-form-item label='封面' prop='cover'>
               <el-radio-group v-model='formdata.cover.type' @change='changeImg'>
                  <el-radio :label='1'>单图</el-radio>
                  <el-radio :label='3'>三图</el-radio>
                  <el-radio :label='0'>无图</el-radio>
                  <el-radio :label='0'>自动</el-radio>
               </el-radio-group>
          </el-form-item>
          <!-- 封面组件 -->
          <!-- 传递父组件的formdata.cover.images给子组件,子组件根据images的长度展示对应的框框 -->
          <cover-img :images='formdata.cover.images' @cdImgUrl='receive'></cover-img>
          <el-form-item label='频道' prop='channel_id'>
              <el-select v-model='formdata.channel_id'>
                  <el-option v-for='item in channels' :label='item.name' :value='item.id' :key='item.id'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click='publish(false)'>发表</el-button>
             <el-button @click='publish(true)'>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 频道列表
      formdata: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题控制在5到30个字符之内', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取文章频道
    getChannel () {
      this.$http({
        url: '/channels'
      }).then((result) => {
        console.log(result)
        this.channels = result.data.channels
      })
    },
    // 发表文章
    publish (draft) {
      this.$refs.ruleForm.validate((isOk, err) => {
        if (isOk) {
          // 判断有没有articleId,有就编辑，没有就是发表
          let articleId = this.$route.params.id
          this.$http({
            url: articleId ? `articles/${articleId}` : `articles`,
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formdata
          }).then(() => {
            let state = articleId ? `修改` : `发表`
            this.$message({ message: `${state}成功`, type: 'success' })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 编辑文章时，获取对应id的信息，显示在页面
    getEdidInfo (editId) {
      this.$http({
        url: `articles/${editId}`
      }).then((result) => {
        this.formdata = result.data
      })
    },
    // 上传图片
    changeImg () {
      if (this.formdata.cover.type === 1) {
        this.formdata.cover.images = ['']
      } else if (this.formdata.cover.type === 3) {
        this.formdata.cover.images = ['', '', '']
      } else {
        this.formdata.cover.images = []
      }
    },
    // 接收子组件cover-img传过来的url和index，更改images
    receive (url, index) {
      this.formdata.cover.images = this.formdata.cover.images.map(function (item, i) {
        if (index === i) {
          return url
        }
        return item
      })
    }
  },
  created () {
    this.getChannel()
    // 获取编辑文章的id
    let editId = this.$route.params.id
    editId && this.getEdidInfo(editId)
  }
}
</script>

<style>

</style>
