<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeHaproxy extends Vue {
  modeList = ['cluster', 'single'];
  algorithmList = ['source', 'leastconn', 'roundrobin', 'static-rr', 'first', 'uri', 'url_param', 'hdr'];
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
        label: 'serve',
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
      {type: 'input', label: '连接地址', key: 'connect_address'},
      {type: 'input', label: '端口', key: 'port'},
    ],
    [
      {type: 'input', label: '后台地址', key: 'manage_address'},
      {type: 'input', label: '账号/密码', key: 'manage_user'},
    ],
    [
      {type: 'selStr', label: '调度算法', key: 'algorithm', optList: this.algorithmList},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
