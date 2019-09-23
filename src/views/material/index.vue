<template>
  <el-card>
      <break-crumb slot='header'>
            <template slot='title'>素材管理</template>
      </break-crumb>
            <!-- 上传图片 -->

        <el-upload
            class="sc"
            action="" :http-request='uploadImg' :show-file-list='false' style="z-index:9999999999">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

      <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="全部素材" name="all">
                <div class='img-list'>
                <el-card v-for='item in list' :key='item.id' class='img-pic'>
                    <img :src="item.url" alt="">
                    <div class='operat'>
                        <i class='el-icon-star-on' :style="{color:item.is_collected?'red':'black'}" @click='collectOrNo(item)'></i>
                        <i class='el-icon-delete-solid' @click='delItem(item.id)'></i>
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
        method: 'post',
        data
      }).then(() => {
        // debugger
        this.$message({ message: '恭喜您，上传成功', type: 'success' })
        this.getMaterial()
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取数据
    getMaterial () {
      this.$http({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 删除素材
    delItem (id) {
      this.$confirm('您真的要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getMaterial()
        })
      })
    },
    // 收藏或取消收藏
    collectOrNo (item) {
      let state = item.is_collected ? '取消' : ''
      this.$confirm(`您是否要${state}收藏?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `user/images/${item.id}`,
          method: 'put',
          data: { 'collect': !item.is_collected }
        }).then(() => {
          this.getMaterial()
        })
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.sc {
    position: absolute;
    right:20px;
    margin-top:-10px;
}
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
