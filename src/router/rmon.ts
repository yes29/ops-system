// 注：新增及编辑时，name必须加前缀，新增及编辑以name跳转
const file = '/rmon/';
export default [
  { // 汇总监控
    path: file + 'overview',
    name: 'overview',
    meta: { title: '汇总监控', rmon: true},
    component: () => import('@/views/rmon/overview.vue'),
  }, { // 域名搜索
    path: file + 'search',
    name: 'search',
    meta: { title: '域名搜索', rmon: true},
    component: () => import('@/views/rmon/search.vue'),
  }, { // 重点域名
    path: file + 'domain',
    name: 'domain',
    meta: { title: 'domain', rmon: true},
    component: () => import('@/views/rmon/domain.vue'),
  },
];
