const file = '/business/';
export default [{
  path: '/business',
  component: () => import('@/views/business/business.vue'),
  name: 'business',
  meta: { title: '业务服务'},
}, { // 新增业务
  path: file + 'create-business',
  name: 'create_business',
  meta: {title: '新增业务'},
  component: () => import('@/views/business/editor/ade-business.vue'),
}, { // 编辑业务
  path: file + 'update-business',
  name: 'update_business',
  meta: {title: '编辑业务'},
  component: () => import('@/views/business/editor/ade-business.vue'),
}, { // 服务监控
  path: file + 'm-service',
  name: 'm_service',
  meta: { title: '服务监控', rmon: true},
  component: () => import('@/views/business/monitor/m-service.vue'),
}, { // 业务监控
  path: file + 'm-business',
  name: 'm_business',
  meta: { title: '业务监控', rmon: true},
  component: () => import('@/views/business/monitor/m-business.vue'),
}];
