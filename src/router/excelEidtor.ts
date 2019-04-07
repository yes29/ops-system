export default [ {
  path: '/excel-editor',
  component: () => import('@/views/excelEditor/excel-editor.vue'),
  name: 'excelEditor',
  meta: { title: '批量导入', cache: true},
}];
