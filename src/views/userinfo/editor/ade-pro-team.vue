<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeProTeam extends Vue {
  columns = [
    [
      {type: 'input', label: '组名', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '负责人', key: 'leader', required: true},
    ],
    [
      {type: 'input', label: '标签', key: 'label'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
