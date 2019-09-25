<template>
  <div>
      <!-- 根据images的个数生成封面 -->
      <div class='pic' v-if='images.length>0'>
      <div v-for='(item,index) in images' :key='index'>
          <img :src="item?item:defaultImg" alt="" @click='clickImg(index)'>
      </div>
      </div>
      <el-dialog :visible='dialogVisible' @close='dialogVisible=false'>
          <!-- 监听selectOneImg事件 -->
          <selcet-img @selectOneImg='receive'></selcet-img>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'], // 父组件传过来的formdata.cover.images
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectImgIndex: -1// 图片的索引
    }
  },
  methods: {
    // 接收select-img组件传递过来的url
    receive (url) {
      // 抛出事件把url和点击时，图片的索引传递给父组件publish中的index.vue
      this.$emit('cdImgUrl', url, this.selectImgIndex)
    },
    clickImg (index) {
      this.dialogVisible = true
      // 记录当前的索引
      this.selectImgIndex = index
    }
  }

}
</script>

<style lang='less' scoped>
.pic {
    display: flex;
    margin-left: 100px;
    div{
    height: 240px;
    border: 1px solid #ccc;
    width: 258px;
    padding: 10px;
    margin-left: -1px;
    img{
      width: 100%;
      height: 100%
    }
    }
}
</style>
