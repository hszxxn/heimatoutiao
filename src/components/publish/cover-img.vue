<template>
  <div>
      <!-- 根据images的个数生成封面 -->
      <div class='pic' v-if='images.length>0'>
      <div v-for='(item,index) in images' :key='index'>
          <img :src="item?item:defaultImg" alt="">
      </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'], // 父组件传过来的formdata.cover.images
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
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
