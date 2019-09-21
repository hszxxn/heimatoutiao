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
          <!-- el-table-column组件上的插槽上有row,column,$index等，el-buttom想要拿到上面的信息，需要使用作用域插槽
           -->
           <template slot-scope="obj">
                 <el-button type='text'>修改</el-button>
                 <!-- 拿到el-table-cloumn上面的row,获取评论状态，确定按钮是关闭评论还是打开评论 -->
                 <el-button type='text' @click="openOrClose(obj.row)">
                   {{obj.row.comment_status?'关闭评论':'打开评论'}}
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
    // 打开或者关闭评论
    openOrClose (row) {
      let state = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${state}评论么?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/comments/status',
          method: 'put',
          params: { 'article_id': row.id },
          data: { 'allow_comment': !row.comment_status }
        }).then(() => {
          // 成功之后重新拉取数据
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
