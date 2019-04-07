const file = '/userinfo/';
export default [{ // 公司信息
  path: file + 'company',
  name: 'company',
  meta: { title: '公司信息'},
  component: () => import('@/views/userinfo/company.vue'),
}, { // 新增公司
  path: file + 'create-company',
  name: 'create_company',
  meta: {title: '新增公司'},
  component: () => import('@/views/userinfo/editor/ade-company.vue'),
}, { // 编辑公司
  path: file + 'update-company',
  name: 'update_company',
  meta: {title: '编辑公司'},
  component: () => import('@/views/userinfo/editor/ade-company.vue'),
}, { // 账号管理
  path: file + 'account',
  name: 'account',
  meta: { title: '账号管理'},
  component: () => import('@/views/userinfo/account.vue'),
}, { // 新增账号
  path: file + 'create-account',
  name: 'create_account',
  meta: {title: '新增账号'},
  component: () => import('@/views/userinfo/editor/ade-account.vue'),
}, { // 编辑账号
  path: file + 'update-account',
  name: 'update_account',
  meta: {title: '编辑账号'},
  component: () => import('@/views/userinfo/editor/ade-account.vue'),
}, { // 项目组
  path: file + 'pro-team',
  name: 'project_team',
  meta: { title: '项目组'},
  component: () => import('@/views/userinfo/pro-team.vue'),
}, { // 新增项目组
  path: file + 'create-pro-team',
  name: 'create_project_team',
  meta: {title: '新增项目组'},
  component: () => import('@/views/userinfo/editor/ade-pro-team.vue'),
}, { // 编辑项目组
  path: file + 'ade-pro-team',
  name: 'update_project_team',
  meta: {title: '编辑项目组'},
  component: () => import('@/views/userinfo/editor/ade-pro-team.vue'),
}, { // 权限管理
  path: file + 'power-system',
  name: 'permission_group',
  meta: { title: '权限管理'},
  component: () => import('@/views/userinfo/power-system.vue'),
}, { // 新增权限
  path: file + 'create-power-system',
  name: 'create_permission_group',
  meta: {title: '新增权限'},
  component: () => import('@/views/userinfo/editor/ade-power-system.vue'),
}, { // 编辑权限
  path: file + 'update-power-system',
  name: 'update_permission_group',
  meta: {title: '编辑权限'},
  component: () => import('@/views/userinfo/editor/ade-power-system.vue'),
}, { // 用户信息
  path: file + 'user-profile',
  name: 'user',
  meta: { title: '用户信息'},
  component: () => import('@/views/userinfo/user-profile.vue'),
}, { // 新增用户
  path: file + 'create-user-profile',
  name: 'create_user',
  meta: {title: '新增用户'},
  component: () => import('@/views/userinfo/editor/ade-user-profile.vue'),
}, { // 编辑用户
  path: file + 'update-user-profile',
  name: 'update_user',
  meta: {title: '编辑用户'},
  component: () => import('@/views/userinfo/editor/ade-user-profile.vue'),
}];
