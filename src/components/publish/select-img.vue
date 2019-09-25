<template>
   <el-tabs v-model="activeName">
      <el-tab-pane label='全部素材' name='all'>
          <div class='tabImg'>
          <div class='allMaterial' v-for="(item,index) in list" :key='index'>
             <el-card class='cardImg'>
                 <img :src="item.url?item.url:defaultImg" alt="" @click='selectImg(item)'>
             </el-card>
          </div>
          </div>
            <el-row type='flex' justify='center'>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changePage'
            :total="page.total" :current-page='page.currentPage' :page-size="page.pageSize">
          </el-pagination>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label='上传素材' name='upload'>
           <div class='upload'>
                <el-upload action='' :http-request='uploadImg'>
                     <img src="../../assets/img/pic_bg.png" alt="">
                </el-upload>
           </div>

      </el-tab-pane>
   </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部素材
      list: [],
      defaultImg: require('../../assets/img/default.jpg'), // 默认图片
      // 分页
      page: {
        total: 0,
        pageSize: 9,
        currentPage: 1
      }
    }
  },
  methods: {
    // 获取素材
    getMaterial () {
      this.$http({
        url: 'user/images',
        params: { collect: 'false', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 选择图片
    selectImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        this.$emit('selectOneImg', result.data.url)
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.tabImg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
    .cardImg{
     width: 140px;
     height: 100px;
     margin: 10px;
     img{
      width: 100%;
      height: 100%;
    }
    }
}
.upload{
  width: 242px;
  height: 222px;
  border: 1px solid #ccc
}
</style>
