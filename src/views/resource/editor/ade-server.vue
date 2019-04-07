<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList, rscListRegion } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
import NetworkCard from './modal/network-card.vue';
@Component({components: {TdEditor}})
export default class AdeServer extends Vue {
  minionStatus = [ '未启动', '启动'];
  typeList = [
    {id: 0, name: 'VM'},
    {id: 1, name: '宿主机'},
    // {id: 2, name: '容器'},
    {id: 3, name: '主机'},
    {id: 4, name: '阿里云'},
    {id: 5, name: '腾讯云'},
  ];
  columns = [
    [
      {type: 'select', label: '类型', key: 'server_type', required: true,  optList: this.typeList},
      {type: 'input', label: '主机名', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '所属系统', key: 'os', required: true},
      {type: 'input', label: '系统版本', key: 'os_version'},
    ],
    [
      {type: 'number', label: 'cpu(核)', key: 'cpu'},
      {type: 'number', label: '内存(G)', key: 'memory'},
    ],
    [
      {type: 'number', label: '硬盘(G)', key: 'disk'},
      {
        type: 'render',
        label: '网卡',
        key: 'network_card',
        render: (h: any, data: any) => {
          return h(NetworkCard, {
            props: {
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {type: 'input', label: 'minion名称', key: 'minion_name'},
      {type: 'select', label: 'minion状态', key: 'minion_status', optList: this.minionStatus},
    ],
    [
      {type: 'input', label: '主IP', key: 'primary_ip'},
      {type: 'input', label: '远程端口', key: 'remote_port'},
    ],
    [
      {type: 'input', label: '网关', key: 'gateway'},
      {type: 'input', label: '子网掩码', key: 'subnet_mask'},
    ],
    [ // VM
      {type: 'select', label: '所属宿主机', key: 'pserver_id', optList: [], showKey: 'server_type', showValue: 0},
    ],
    [ // 组件里面判断只有一个区分showValue --> 宿主机
      {type: 'select', label: '所属物理机', key: 'pm_server_id', optList: [], showKey: 'server_type', showValue: 1},
    ],
    [ // 组件里面判断只有一个区分showValue --> 主机
      {type: 'select', label: '所属物理机', key: 'pm_server_id', optList: [], showKey: 'server_type', showValue: 3},
    ],
    [ // 阿里云
      {type: 'select', label: '所属区域', key: 'a_region_id',  optList: [], showKey: 'server_type', showValue: 4},
    ],
    [ // 腾讯云
      {type: 'select', label: '所属区域', key: 't_region_id',  optList: [], showKey: 'server_type', showValue: 5},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  getSelect() {
    getSelectList('pmserver').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'pm_server_id');
    });
    getSelectList('server').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'pserver_id');
    });
    rscListRegion().then((rest: any) => {
      rest = rest[0];
      this.columns = pushOptColumns(this.columns, rest.a_list, 'a_region_id');
      this.columns = pushOptColumns(this.columns, rest.t_list, 't_region_id');
    });
  }
}
</script>
