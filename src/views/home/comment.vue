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
          <el-button type='text'>修改</el-button>
          <el-button type='text'>关闭</el-button>
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
    }
  },
  created () {
    this.getCommont()
  }
}
</script>

<style>

</style>
