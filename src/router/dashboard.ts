export default [ {
  path: '/dashboard',
  component: () => import('@/views/dashboard/dashboard.vue'),
  name: 'dashboard',
  meta: { title: '首页'},
}];
