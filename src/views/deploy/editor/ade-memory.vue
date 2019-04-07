<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeMemory extends Vue {
  typeList = ['sas', 'ssd'];
  columns = [
    [
      {type: 'input', label: '型号', key: 'type', required: true},
    ],
    [
      {type: 'input', label: '品牌', key: 'brand', required: true},
    ],
    [
      {type: 'number', label: '容量(G)', key: 'space'},
    ],
    [
      {type: 'input', label: '工作电压', key: 'voltage'},
    ],
    [
      {type: 'input', label: '频率', key: 'frequency'},
    ],
    [
      {type: 'input', label: '制造商', key: 'manufacturer'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
