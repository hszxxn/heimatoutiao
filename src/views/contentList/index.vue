<template>
  <el-card v-loading='loading'>
      <break-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
      </break-crumb>
      <el-form>
          <!-- 文章状态 -->
         <el-form-item label='文章状态:' label-width='120px'>
              <!-- formData.status的值是label的值 -->
              <el-radio-group style='margin-left:20px' v-model="formData.status" @change="change">
                  <el-radio :label='5'>全部</el-radio>
                  <el-radio :label='0'>草稿</el-radio>
                  <el-radio :label='1'>待审核</el-radio>
                  <el-radio :label='2'>审核通过</el-radio>
                  <el-radio :label='3'>审核失败</el-radio>
          </el-radio-group>
          </el-form-item>
          <!-- 频道列表 -->
          <el-form-item label='频道列表:' label-width='120px'>
              <el-select style='margin-left:20px' v-model="formData.channelId" @change='change'>
                  <el-option v-for='item in channels' :key='item.id' :value='item.id' :label='item.name'>
                  </el-option>
              </el-select>
          </el-form-item>
          <!-- 时间选择 -->
          <el-form-item label='时间选择:' label-width='120px'>
                <el-date-picker style='margin-left:20px' @change='change'
                v-model="formData.date"
                value-format='yyyy-mm-dd'
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
          <!-- 列表 -->
          <div class='total'>共找到{{count}}条符合条件的内容</div>
          <div class='list' v-for='(item,index) in list' :key='index'>
              <!-- 左侧 -->
              <div class='left'>
                  <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
                  <div class='content'>
                        <span>{{item.title}}</span>
                        <el-tag class='status' :type='item.status|getType'>{{item.status|getStatus}}</el-tag>
                        <span>{{item.pubdate}}</span>
                  </div>
              </div>
              <!-- 右侧 -->
              <div class='right'>
                  <i class='el-icon-edit' @click='editItem(item.id)'>修改</i>
                  <i class='el-icon-delete' @click='delItem(item.id)'>删除</i>
              </div>
          </div>
      </el-form>
      <el-row type='flex' justify='center'>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changePage'
            :total="page.total" :current-page='page.currentPage'
            :page-size='page.pageSize'>
          </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [], // 列表数据
      defaultImg: require('../../assets/img/default.jpg'), // 默认图片
      count: '', // 总数
      formData: {
        status: 5,
        channelId: null, // 频道Id
        date: []
      },
      channels: [], // 频道
      //   分页
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // 获取内容列表的数据
    getData (params) {
      this.loading = true
      this.$http({
        url: '/articles',
        params
      }).then((result) => {
        console.log(result)
        this.list = result.data.results
        this.count = result.data.total_count
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    // 获取频道列表
    getChannels () {
      this.$http({
        url: 'channels'
      }).then((result) => {
        console.log(result)
        this.channels = result.data.channels
      })
    },
    // 通过参数获取数据
    prepareParams () {
      let params = {
        channel_id: this.formData.channelId,
        status: this.formData.status === 5 ? null : this.formData.status,
        begin_pubdate: this.formData.date > 0 ? this.formData.date[0] : null,
        end_pubdate: this.formData.date > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        pre_page: this.page.pageSize
      }
      this.getData(params)
    },
    // 改变查询条件，页码归一，进行查询
    change () {
      this.page.currentPage = 1
      this.prepareParams()
    },
    // 改变页码，传入当前页码，进行查询
    changePage (newPage) {
      this.page.currentPage = newPage
      this.prepareParams()
    },
    // 删除
    delItem (id) {
      this.$confirm('您确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        this.$http({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({ 'message': '删除成功', 'type': 'success' })
          this.prepareParams()
        })
      })
    },
    // 编辑文章
    editItem (id) {
      this.$router.push(`/home/publish/${id}`)
    }
  },
  filters: {
    // 对状态进行过滤
    getStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          break
      }
    },
    // 对el-tag的type进行过滤
    getType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
        default:
          break
      }
    }

  },
  created () {
    this.getData()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
 .total {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px dashed #ccc
    }
.list {
    display: flex;
    justify-content: space-between;
    height: 130px;
    padding: 20px;
    border-bottom: 1px solid #f2f3f5;
    .left{
        display: flex;
        img {
            width: 150px;
            height: 100px;
        }
        .content {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            span {
                padding-bottom: 8px;
            }
            span:nth-child(1){
                font-size: 14px;
            }
            span:nth-child(3){
                font-size: 12px;
                margin-top: 9px;
                color:#999
            }
            .status {
                width: 60px
            }
        }
    }
    .right {
        font-size: 14px;
        cursor: pointer;
        .el-icon-delete {
            margin-left: 20px
        }
    }

}
</style>
