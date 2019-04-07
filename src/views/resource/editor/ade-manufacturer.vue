<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeManufacturer extends Vue {
  columns = [
    [
      {type: 'input', label: '厂商名称', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '厂商地址', key: 'address', required: true},
    ],
    [
      {type: 'input', label: '联系人', key: 'link_name'},
    ],
    [
      {type: 'input', label: '联系电话', key: 'phone'},
    ],
    [
      {type: 'input', label: '邮箱', key: 'email'},
    ],
     [
      {type: 'input', label: '网址', key: 'website'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
