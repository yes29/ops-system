<template>
 <td-editor :columns="columns" label-width="80px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeRaid extends Vue {
  columns = [
    [
      {type: 'input', label: '型号', key: 'type', required: true},
    ],
    [
      {type: 'input', label: '标签', key: 'label', required: true},
    ],
    [
      {type: 'select', label: '物理机', key: 'pm_server_id', optList: [], required: true},
    ],
    [
      {type: 'select', label: '硬盘', key: 'disk_id', optList: [], required: true},
    ],
    [
      {type: 'number', label: '硬盘块数', key: 'disk_num'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  eachList(list: any) {
    for (const k of list) {
      k.name = k.type;
    }
    return list;
  }

  getSelect() {
    getSelectList('pmserver').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'pm_server_id');
    });
    getSelectList('disk').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, this.eachList(rest), 'disk_id');
    });
  }
}
</script>
