<template>
 <el-card>
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
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      commontData: [{}]
    }
  },
  methods: {
    // 获取评论
    getCommont () {
      this.$http({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        console.log(result)
        this.commontData = result.data.results
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
    }

  },
  created () {
    this.getCommont()
  }
}
</script>

<style>

</style>
