<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeCabinet extends Vue {
  columns = [
    [
      {type: 'input', label: '机柜名称', key: 'name', required: true},
    ],
    [
      {type: 'select', label: '所属机房', key: 'data_center_id', required: true, optList: []},
    ],
    [
      {type: 'select', label: '所属公司', key: 'company_id', required: true, optList: []},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  // 通过接口获取下拉列表
  getSelect() {
    getSelectList('datacenter').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'data_center_id');
    });
    getSelectList('company').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'company_id');
    });
  }
}
</script>
