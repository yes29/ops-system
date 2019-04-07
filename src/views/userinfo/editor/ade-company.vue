<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeCompany extends Vue {
  columns = [
    [
      {type: 'input', label: '名称', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '组织', key: 'organization', required: true},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

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
