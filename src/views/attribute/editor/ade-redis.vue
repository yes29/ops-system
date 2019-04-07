<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeRedis extends Vue {
  modeList = ['主从集群', '哨兵集群', '独立集群'];
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
        label: '关联proxy',
        key: 'agent_ids',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: 'proxy_',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {type: 'input', label: '认证密码', key: 'auth_pass'},
      {type: 'input', label: '集群名', key: 'master_name'},
    ],
    [
      {type: 'input', label: 'service_db', key: 'service_db'},
      {type: 'input', label: 'HA连接地址', key: 'ha_address'},
    ],
    [
      {type: 'input', label: '哨兵地址', key: 'sentinel_address'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
