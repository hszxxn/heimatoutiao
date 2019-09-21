<template>
 <el-card>
   <break-crumb slot='header'>
          <template slot='title'>评论列表</template>
   </break-crumb>
   <el-table :data='commontData'>
       <el-table-column label='标题' prop='title' width='600px'></el-table-column>
       <el-table-column label='评论状态' prop='comment_status' align='center'></el-table-column>
       <el-table-column label='评论数' prop='total_comment_count' align='center'></el-table-column>
       <el-table-column label='粉丝评论数' prop='fans_comment_count' align='center'></el-table-column>
       <el-table-column label='操作' align='center'></el-table-column>
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
    getCommont () {
      this.$http({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        console.log(result)
        this.commontData = result.data.results
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
