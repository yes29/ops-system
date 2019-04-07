import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import Dashboard from './dashboard'; // 首页
import Resource from './resource'; // 物理资源
import Deploy from './deploy'; // 物理配置
import Attribute from './attribute'; // 服务资源
import Userinfo from './userinfo'; // 账号配置
import Business from './business'; // 业务服务
import Rmon from './rmon'; // 监控总览
import ExcelEidtor from './excelEidtor'; // 监控总览
Vue.use(Router);
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('@/views/userinfo/login.vue') },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
    },
    {
      path: '',
      name: 'excelEditor',
      component: Layout,
      children: [...ExcelEidtor],
    },
    {
      path: '',
      name: 'dashboard',
      component: Layout,
      children: [...Dashboard],
    },
    {
      path: '',
      name: 'business',
      component: Layout,
      children: [...Business],
    },
    {
      path: '',
      name: 'resource',
      meta: { title: '物理资源'},
      component: Layout,
      children: [...Resource],
    },
    {
      path: '',
      name: 'attribute',
      meta: { title: '服务资源'},
      component: Layout,
      children: [...Attribute],
    },
    {
      path: '',
      name: 'rmon',
      meta: { title: '监控总览'},
      component: Layout,
      children: [...Rmon],
    },
    {
      path: '',
      name: 'deploy',
      meta: { title: '资源配置'},
      component: Layout,
      children: [ ...Deploy],
    },
    {
      path: '',
      name: 'userinfo',
      meta: { title: '账号设置'},
      component: Layout,
      children: [ ...Userinfo],
    },
    { path: '*', redirect: '/404' },
  ],
});
