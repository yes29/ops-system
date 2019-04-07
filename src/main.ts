import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css';
import '@/assets/element-ui/index.css'; // 由于版本风格切换不一致，故提取
import '@/assets/iconfont/iconfont.css'; // 字体图标
import '@/assets/css/index.scss';
import '@/utils/permit';
import app from '@/app.vue';
import router from '@/router/index';
import store from '@/store';
import SvgIcon from 'vue-svgicon';
import '@/assets/icons';
import '../public/registerServiceWorker';
import { calcHeight } from '@/utils/index';
// ,  { size: 'medium' }
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});
new Vue({
  router,
  store,
  render: (h) => h(app),
}).$mount('#app');
// 定义全局，减少代码压缩
const vueP = Vue.prototype;
vueP.calc = calcHeight;
