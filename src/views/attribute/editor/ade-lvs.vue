<template>
 <td-editor :columns="columns" label-width="100px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeLvs extends Vue {
  modeList = ['主从模式', '互为主从模式'];
  protocolList = ['TCP', ' UDP'];
  transpondList = ['DR', 'NAT', 'TUN'];
  algorithmList = ['rr', 'wrr', 'lc', 'wlc', 'lblc', 'lblcr', 'dh', 'sh'];
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
      {type: 'selStr', label: '协议', key: 'protocol', optList: this.protocolList},
      {type: 'selStr', label: '转发规则', key: 'transpond_rule', optList: this.transpondList},
    ],
    [
      {type: 'selStr', label: '调度算法', key: 'algorithm', optList: this.algorithmList},
      {type: 'input', label: 'vip', key: 'vip'},
    ],
    [
      {type: 'number', label: '健康检查(ms)', key: 'health_check'},
      {type: 'number', label: '会话保持(ms)', key: 'session_time'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
