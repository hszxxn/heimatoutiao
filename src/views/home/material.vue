<template>
  <el-card>
      <break-crumb slot='header'>
            <template slot='title'>素材管理</template>
      </break-crumb>
            <el-upload
            class="upload-demo"
            action="" :http-request='uploadImg' :show-file-list='false'>
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
      <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="全部素材" name="all">
                <div class='img-list'>
                <el-card v-for='item in list' :key='item.id' class='img-pic'>
                    <img :src="item.url" alt="">
                    <div class='operat'>
                        <i class='el-icon-star-on' :style="{color:item.is_collected?'red':'black'}"></i>
                        <i class='el-icon-delete-solid'></i>
                    </div>
                </el-card>
                </div>

            </el-tab-pane>
            <el-tab-pane label="收藏素材" name="collect">
                 <div class='img-list'>
                 <el-card v-for='item in list' :key='item.id' class='img-pic'>
                    <img :src="item.url" alt="">
                </el-card>
                </div>
            </el-tab-pane>

      </el-tabs>
      <el-row type='flex' justify='center' >
                    <el-pagination
                     background
                     layout="prev, pager, next"
                     :total="page.total" :current-page='page.currentPage' @current-change='changePage'>
                    </el-pagination>
      </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认
      list: '', // 图片数据
      //   分页
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: 'user/images',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$http({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage
        }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>

.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-pic {
      position: relative;
      width: 170px;
      height: 170px;
      margin: 15px;
      border-radius: 5px;
      img{
          width: 100%;
          height: 100%;
      }
      .operat {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 30px;
          width: 100%;
          background: #f4f5f6;
          display: flex;
          justify-content: space-around;
          i{
              margin-top: 5px;
              font-size: 18px
          }
      }
    }

}
</style>
