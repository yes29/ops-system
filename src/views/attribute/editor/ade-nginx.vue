<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeNginx extends Vue {
  modeList = ['cluster', 'single'];
  columns = [
    [
      {type: 'input', label: '应用名', key: 'name', required: true},
      {type: 'input', label: '标签', key: 'label', required: true},
    ],
    [
      {type: 'selStr', label: '集群模式', key: 'mode', required: true, optList: this.modeList},
      {type: 'input', label: '版本', key: 'version', required: true},
    ],
    [
      {
        type: 'render',
        label: '关联service',
        key: 'service_ids',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: '',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
      {
        type: 'render',
        label: '关联db',
        key: 'db_ids',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: 'db_',
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
