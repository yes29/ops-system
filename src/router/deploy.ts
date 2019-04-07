// 注：新增及编辑时，name必须加前缀，新增及编辑以name跳转
const file = '/deploy/';
export default [
  { // cpu
    path: file + 'cpu',
    name: 'cpu',
    meta: { title: 'cpu'},
    component: () => import('@/views/deploy/cpu.vue'),
  }, { // 新增cpu
    path: file + 'create-cpu',
    name: 'create_cpu',
    meta: {title: '新增cpu'},
    component: () => import('@/views/deploy/editor/ade-cpu.vue'),
  }, { // 编辑cpu
    path: file + 'update-cpu',
    name: 'update_cpu',
    meta: {title: '编辑cpu'},
    component: () => import('@/views/deploy/editor/ade-cpu.vue'),
  }, { // 内存
    path: file + 'memory',
    name: 'memory',
    meta: { title: '内存'},
    component: () => import('@/views/deploy/memory.vue'),
  }, { // 新增memory
    path: file + 'create-memory',
    name: 'create_memory',
    meta: {title: '新增memory'},
    component: () => import('@/views/deploy/editor/ade-memory.vue'),
  }, { // 编辑memory
    path: file + 'update-memory',
    name: 'update_memory',
    meta: {title: '编辑memory'},
    component: () => import('@/views/deploy/editor/ade-memory.vue'),
  }, { // 硬盘陈列
    path: file + 'disk',
    name: 'disk',
    meta: { title: '硬盘'},
    component: () => import('@/views/deploy/disk.vue'),
  }, { // 新增disk
    path: file + 'create-disk',
    name: 'create_disk',
    meta: {title: '新增硬盘'},
    component: () => import('@/views/deploy/editor/ade-disk.vue'),
  }, { // 编辑disk
    path: file + 'update-disk',
    name: 'update_disk',
    meta: {title: '编辑硬盘'},
    component: () => import('@/views/deploy/editor/ade-disk.vue'),
  }, { // raid陈列
    path: file + 'raid',
    name: 'raid',
    meta: { title: 'Raid'},
    component: () => import('@/views/deploy/raid.vue'),
  }, { // 新增raid
    path: file + 'create-raid',
    name: 'create_raid',
    meta: {title: '新增Raid'},
    component: () => import('@/views/deploy/editor/ade-raid.vue'),
  }, { // 编辑memory
    path: file + 'update-raid',
    name: 'update_raid',
    meta: {title: '编辑Raid'},
    component: () => import('@/views/deploy/editor/ade-raid.vue'),
  },
];
