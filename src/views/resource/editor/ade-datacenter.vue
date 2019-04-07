<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeDataCenter extends Vue {
  dataCenter = [ '电信机房', '联通机房', '移动机房', 'BGP机房', '阿里云', '腾讯云'];
  columns = [
    [
      {type: 'input', label: '机房名称', key: 'name', required: true},
      {type: 'select', label: '机房类型', key: 'data_center_type', required: true, optList: this.dataCenter},
    ],
    [
      {type: 'input', label: 'IP地址段', key: 'ip'},
      {type: 'input', label: '带宽', key: 'bind_width'},
    ],
    [
      {type: 'input', label: '联系人', key: 'link_name'},
      {type: 'input', label: '联系人电话', key: 'contact_phone'},
    ],
    [
      {type: 'input', label: '机房地址', key: 'address'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
