<template>
  <el-card>
      <break-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
      </break-crumb>
      <el-form>
          <!-- 文章状态 -->
         <el-form-item label='文章状态:' label-width='120px'>
              <el-radio-group style='margin-left:20px'>
                  <el-radio>全部</el-radio>
                  <el-radio>草稿</el-radio>
                  <el-radio>待审核</el-radio>
                  <el-radio>审核通过</el-radio>
                  <el-radio>审核失败</el-radio>
          </el-radio-group>
          </el-form-item>
          <!-- 频道列表 -->
          <el-form-item label='频道列表:' label-width='120px'>
              <el-select style='margin-left:20px'>
                  <el-option>
                  </el-option>
              </el-select>
          </el-form-item>
          <!-- 时间选择 -->
          <el-form-item label='时间选择:' label-width='120px'>
                <el-date-picker style='margin-left:20px'
                v-model="value1"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
          <!-- 列表 -->
          <div class='total'>共找到{{count}}条符合条件的内容</div>
          <div class='list' v-for='item in list' :key='item.id'>
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
                  <i class='el-icon-edit'>修改</i>
                  <i class='el-icon-delete'>删除</i>
              </div>
          </div>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 列表数据
      defaultImg: require('../../assets/img/default.jpg'), // 默认图片
      count: '' // 总数

    }
  },
  methods: {
    // 获取内容列表的数据
    getData () {
      this.$http({
        url: '/articles'
      }).then((result) => {
        console.log(result)
        this.list = result.data.results
        this.count = result.data.total_count
      })
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
