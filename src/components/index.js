import layoutSlider from '../components/home/layout-aslider'
import layoutHeader from '../components/home/layout-header'
import breakCrumb from '../components/common/break-crumb'
export default {
  install (Vue) {
    Vue.component('layoutSlider', layoutSlider)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('break-crumb', breakCrumb)
  }
}
