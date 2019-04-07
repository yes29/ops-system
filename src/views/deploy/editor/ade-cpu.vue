<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeCpu extends Vue {
  columns = [
    [
      {type: 'input', label: '型号', key: 'type', required: true},
      {type: 'input', label: '品牌', key: 'brand', required: true},
    ],
    [
      {type: 'input', label: '核心数', key: 'core_num'},
      {type: 'input', label: '线程数', key: 'thread_num'},
    ],
    [
      {type: 'input', label: '基本频率', key: 'base_freq'},
      {type: 'input', label: '最大频率', key: 'max_freq'},
    ],
    [
      {type: 'input', label: '缓存', key: 'cache'},
      {type: 'input', label: '总线速率', key: 'bus'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
