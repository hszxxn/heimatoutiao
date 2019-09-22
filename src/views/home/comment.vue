<template>
 <el-card v-loading='loading'>
   <break-crumb slot='header'>
          <template slot='title'>评论列表</template>
   </break-crumb>
   <!-- 表格 -->
   <el-table :data='commontData'>
       <el-table-column label='标题' prop='title' width='600px'></el-table-column>
       <el-table-column label='评论状态' prop='comment_status' :formatter='stateFormatter' align='center'></el-table-column>
       <el-table-column label='评论数' prop='total_comment_count' align='center'></el-table-column>
       <el-table-column label='粉丝评论数' prop='fans_comment_count' align='center'></el-table-column>
       <el-table-column label='操作' align='center'>
             <!-- 根据el-table-column,获取row,通过row获取comment_status-->
               <template slot-scope="obj">
                 <el-button type='text'>修改</el-button>
                 <el-button type='text' @click="openOrclose(obj.row)" :style='{color:obj.row.comment_status?"#F56C6C":"#409EFF"}'>
                  {{obj.row.comment_status?'关闭评论':"打开评论"}}
                  </el-button>
               </template>
       </el-table-column>
   </el-table>
   <!-- 分页 -->
   <el-row type='flex' justify='center' style="margin-top:20px">
     <el-pagination
  background
  layout="prev, pager, next"
  :total="page.total" :current-page='page.currentPage'  @current-change='changePage'>
</el-pagination>
   </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 评论数据
      commontData: [{}],
      // 分页
      page: {
        total: 0, // 总数
        // pageSize: 10, // 每页显示的数据条数
        currentPage: 1 // 当前页码
      },
      // 加载遮罩
      loading: false
    }
  },
  methods: {
    // 获取评论
    getCommont () {
      // 发送请求之前显示遮罩
      this.loading = true
      this.$http({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage }
      }).then(result => {
        console.log(result)
        // 请求结束之后关闭遮罩
        this.loading = false
        this.commontData = result.data.results
        this.page.total = result.data.total_count
        // this.page.pageSize = result.data.per_page
      })
    },
    // 对评论状态为布尔值不能显示进行处理
    stateFormatter (row, column, cellValue, index) {
      // debugger
      // return cellValue ? '正常' : '关闭'
      // 或者
      return row.comment_status ? '正常' : '关闭'
    },
    // 打开或关闭评论
    openOrclose (row) {
      let state = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${state}评论?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/comments/status',
          method: 'put',
          // 后台传过来的id经过json-bigint转成了BigNumber类型，所以传过去要转为字符串类型
          params: { 'article_id': row.id.toString() },
          data: { 'allow_comment': !row.comment_status }
        }).then(() => {
          this.getCommont()
        })
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getCommont()
    }

  },
  created () {
    this.getCommont()
  }
}
</script>

<style>

</style>
