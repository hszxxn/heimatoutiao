import layoutSlider from '../components/home/layout-aslider'// 侧边导航
import layoutHeader from '../components/home/layout-header'// 头部
import breakCrumb from '../components/common/break-crumb'// 面包屑组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'// 富文本编辑器
import coverImg from './publish/cover-img'// 封面组件
import selectImg from './publish/select-img'
export default {
  install (Vue) {
    Vue.component('layoutSlider', layoutSlider)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('break-crumb', breakCrumb)
    Vue.component('quill-editor', VueQuillEditor)
    Vue.component('cover-img', coverImg)
    Vue.component('selcet-img', selectImg)
  }
}
