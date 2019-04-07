// 注：新增及编辑时，name必须加前缀，新增及编辑以name跳转
const file = '/attribute/';
export default [{ // zookeeper
  path: file + 'zookeeper',
  name: 'zookeeper',
  meta: { title: 'zookeeper'},
  component: () => import('@/views/attribute/zookeeper.vue'),
}, { // 新增zookeeper
  path: file + 'create-zookeeper',
  name: 'create_zookeeper',
  meta: {title: '新增zookeeper'},
  component: () => import('@/views/attribute/editor/ade-zookeeper.vue'),
}, { // 新增编辑zookeeper
  path: file + 'update-zookeeper',
  name: 'update_zookeeper',
  meta: {title: '编辑zookeeper'},
  component: () => import('@/views/attribute/editor/ade-zookeeper.vue'),
}, { // haproxy
  path: file + 'haproxy',
  name: 'haproxy',
  meta: { title: 'haproxy'},
  component: () => import('@/views/attribute/haproxy.vue'),
}, { // 新增haproxy
  path: file + 'create-haproxy',
  name: 'create_haproxy',
  meta: {title: '新增haproxy'},
  component: () => import('@/views/attribute/editor/ade-haproxy.vue'),
}, { // 编辑haproxy
  path: file + 'update-haproxy',
  name: 'update_haproxy',
  meta: {title: '编辑haproxy'},
  component: () => import('@/views/attribute/editor/ade-haproxy.vue'),
}, { // nginx
  path: file + 'nginx',
  name: 'nginx',
  meta: { title: 'nginx'},
  component: () => import('@/views/attribute/nginx.vue'),
}, {// 新增nginx
  path: file + 'create-nginx',
  name: 'create_nginx',
  meta: {title: '新增nginx'},
  component: () => import('@/views/attribute/editor/ade-nginx.vue'),
}, {// 编辑nginx
  path: file + 'update-nginx',
  name: 'update_nginx',
  meta: {title: '编辑nginx'},
  component: () => import('@/views/attribute/editor/ade-nginx.vue'),
}, { // Lvs
  path: file + 'lvs',
  name: 'lvs',
  meta: { title: 'lvs'},
  component: () => import('@/views/attribute/lvs.vue'),
}, {// 新增lvs
  path: file + 'create-lvs',
  name: 'create_lvs',
  meta: {title: '新增lvs'},
  component: () => import('@/views/attribute/editor/ade-lvs.vue'),
}, {// 编辑lvs
  path: file + 'update-lvs',
  name: 'update_lvs',
  meta: {title: '编辑lvs'},
  component: () => import('@/views/attribute/editor/ade-lvs.vue'),
}, { // mq
  path: file + 'mq',
  name: 'mq',
  meta: { title: 'mq'},
  component: () => import('@/views/attribute/mq.vue'),
}, {// 新增mq
  path: file + 'update-mq',
  name: 'create_mq',
  meta: {title: '新增mq'},
  component: () => import('@/views/attribute/editor/ade-mq.vue'),
}, {// 编辑mq
  path: file + 'update-mq',
  name: 'update_mq',
  meta: {title: '编辑mq'},
  component: () => import('@/views/attribute/editor/ade-mq.vue'),
}, { // mysql
  path: file + 'mysql',
  name: 'mysql',
  meta: { title: 'mysql'},
  component: () => import('@/views/attribute/mysql.vue'),
}, {// 新增mysql
  path: file + 'create-mysql',
  name: 'create_mysql',
  meta: {title: '新增mysql'},
  component: () => import('@/views/attribute/editor/ade-mysql.vue'),
}, {// 编辑mysql
  path: file + 'update-mysql',
  name: 'update_mysql',
  meta: {title: '编辑mysql'},
  component: () => import('@/views/attribute/editor/ade-mysql.vue'),
}, { // redis
  path: file + 'redis',
  name: 'redis',
  meta: { title: 'redis'},
  component: () => import('@/views/attribute/redis.vue'),
}, {// 新增redis
  path: file + 'create-redis',
  name: 'create_redis',
  meta: {title: '新增redis'},
  component: () => import('@/views/attribute/editor/ade-redis.vue'),
}, {// 编辑redis
  path: file + 'update-redis',
  name: 'update_redis',
  meta: {title: '编辑redis'},
  component: () => import('@/views/attribute/editor/ade-redis.vue'),
}, { // java
  path: file + 'java',
  name: 'java',
  meta: { title: 'java'},
  component: () => import('@/views/attribute/java.vue'),
}, {// 新增java
  path: file + 'create-java',
  name: 'create_java',
  meta: {title: '新增java'},
  component: () => import('@/views/attribute/editor/ade-java.vue'),
}, {// 编辑java
  path: file + 'update-java',
  name: 'update_java',
  meta: {title: '编辑java'},
  component: () => import('@/views/attribute/editor/ade-java.vue'),
}];
