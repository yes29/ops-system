<template>
 <td-editor :columns="columns" label-width="100px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeMq extends Vue {
  modeList = ['cluster', 'single'];
  roleList = ['生产者', '消费者'];
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
      {type: 'input', label: 'vhost', key: 'vhost'},
      {type: 'input', label: 'queue', key: 'queue'},
    ],
    [
      {type: 'input', label: 'exchange', key: 'exchange'},
      {type: 'input', label: 'exchange_type', key: 'exchange_type'},
    ],
    [
      {type: 'input', label: 'routing_key', key: 'routing_key'},
      {type: 'input', label: 'bindings', key: 'bindings'},
    ],
    [
      {type: 'selStr', label: '角色', key: 'role', optList: this.roleList},
      {type: 'input', label: 'HA连接地址', key: 'ha_address'},
    ],
    [
      {type: 'input', label: '帐号', key: 'manage_user'},
      {type: 'input', label: '密码', key: 'user_password'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
