<template>
 <td-editor :columns="columns" label-width="72px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeDisk extends Vue {
  typeList = ['sas', 'ssd'];
  columns = [
    [
      {type: 'input', label: '型号', key: 'type', required: true},
    ],
    [
      {type: 'input', label: '品牌', key: 'brand', required: true},
    ],
    [
      {type: 'select', label: '类型', key: 'disk_type', optList: this.typeList},
    ],
    [
      {type: 'number', label: '容量(G)', key: 'space'},
    ],
    [
      {type: 'input', label: '转速', key: 'speed'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
