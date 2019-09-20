import layoutSlider from '../components/home/layout-aslider'
import layoutHeader from '../components/home/layout-header'
export default {
  install (Vue) {
    Vue.component('layoutSlider', layoutSlider)
    Vue.component('layoutHeader', layoutHeader)
  }
}
