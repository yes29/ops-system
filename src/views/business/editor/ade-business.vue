<template>
<td-editor
    :columns="columns"
    :isExport="false"
    :filter="{project_team_id: $route.query.project_team_id}">
</td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import BusinessTransfer from '@/components/transfer/business-transfer.vue';
import Urinfo from './components/uri-info.vue';
@Component({components: {TdEditor}})
export default class AdeBusiness extends Vue {
  columns = [
    [
      {type: 'input', label: '业务名称', key: 'name', required: true},
    ],
    [
      {
        type: 'render',
        label: '关联服务',
        key: 'service_ids',
        render: (h: any, data: any) => {
          return h(BusinessTransfer, {
            props: {
              api: '',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {
        type: 'render',
        label: '重点URL',
        key: 'uri_info',
        render: (h: any, data: any) => {
          return h(Urinfo, {
            props: {
              api: '',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
