// 注：新增及编辑时，name必须加前缀，新增及编辑以name跳转
const file = '/resource/';
export default [
  {
    path: file + 'data-center',
    name: 'datacenter',
    meta: { title: '机房'},
    component: () => import('@/views/resource/data-center.vue'),
  }, { // 新增机房
    path: file + 'create-datacenter',
    name: 'create_datacenter',
    meta: {title: '新增机房'},
    component: () => import('@/views/resource/editor/ade-datacenter.vue'),
  }, { // 编辑机房
    path: file + 'update-datacenter',
    name: 'update_datacenter',
    meta: {title: '编辑机房'},
    component: () => import('@/views/resource/editor/ade-datacenter.vue'),
  }, { // 机柜
    path: file + 'cabinet',
    name: 'cabinet',
    meta: { title: '机柜'},
    component: () => import('@/views/resource/cabinet.vue'),
  }, { // 新增机柜
    path: file + 'create-cabinet',
    name: 'create_cabinet',
    meta: {title: '新增机柜'},
    component: () => import('@/views/resource/editor/ade-cabinet.vue'),
  }, { // 编辑机柜
    path: file + 'update-cabinet',
    name: 'update_cabinet',
    meta: {title: '编辑机柜'},
    component: () => import('@/views/resource/editor/ade-cabinet.vue'),
  }, { // 物理机
    path: file + 'pm-server',
    name: 'pmserver',
    meta: { title: '物理机'},
    component: () => import('@/views/resource/pm-server.vue'),
  }, { // 新增物理机
    path: file + 'create-pmserver',
    name: 'create_pmserver',
    meta: {title: '新增物理机'},
    component: () => import('@/views/resource/editor/ade-pmserver.vue'),
  }, { // 编辑物理机
    path: file + 'update-pmserver',
    name: 'update_pmserver',
    meta: {title: '编辑物理机'},
    component: () => import('@/views/resource/editor/ade-pmserver.vue'),
  }, { // 服务器
    path: file + 'server',
    name: 'server',
    meta: { title: '服务器'},
    component: () => import('@/views/resource/server.vue'),
  }, { // 服务器
    path: file + 'm-server',
    name: 'm_server',
    meta: { title: '服务器监控', rmon: true},
    component: () => import('@/views/resource/monitor/m-server.vue'),
  }, { // 新增服务器
    path: file + 'create-server',
    name: 'create_server',
    meta: {title: '新增服务器'},
    component: () => import('@/views/resource/editor/ade-server.vue'),
  }, { // 编辑服务器
    path: file + 'update-server',
    name: 'update_server',
    meta: {title: '编辑服务器'},
    component: () => import('@/views/resource/editor/ade-server.vue'),
  }, { // 网络设备
    path: file + 'network-devices',
    name: 'device',
    meta: { title: '网络设备'},
    component: () => import('@/views/resource/network-devices.vue'),
  }, { // 新增网络设备
    path: file + 'create-network-devices',
    name: 'create_device',
    meta: {title: '新增网络设备'},
    component: () => import('@/views/resource/editor/ade-network-devices.vue'),
  }, { // 编辑网络设备
    path: file + 'update-network-devices',
    name: 'update_device',
    meta: {title: '编辑网络设备'},
    component: () => import('@/views/resource/editor/ade-network-devices.vue'),
  }, { // 厂商信息
    path: file + 'manufacturer',
    name: 'manufacture',
    meta: { title: '厂商信息'},
    component: () => import('@/views/resource/manufacturer.vue'),
  }, { // 新增网络设备
    path: file + 'create-manufacturer',
    name: 'create_manufacture',
    meta: {title: '新增厂商信息'},
    component: () => import('@/views/resource/editor/ade-manufacturer.vue'),
  }, { // 编辑网络设备
    path: file + 'update-manufacturer',
    name: 'update_manufacture',
    meta: {title: '编辑厂商信息'},
    component: () => import('@/views/resource/editor/ade-manufacturer.vue'),
  }, { // 维修记录
    path: file + 'maintain-record',
    name: 'maintenance/record',
    meta: { title: '维修记录'},
    component: () => import('@/views/resource/maintain-record.vue'),
  }, { // 新增网络设备
    path: file + 'create-maintain-record',
    name: 'create_maintenance/record',
    meta: {title: '新增维修记录'},
    component: () => import('@/views/resource/editor/ade-maintain-record.vue'),
  }, { // 编辑网络设备
    path: file + 'update-maintain-record',
    name: 'update_maintenance/record',
    meta: {title: '编辑维修记录'},
    component: () => import('@/views/resource/editor/ade-maintain-record.vue'),
  },
];
