<template>
 <td-editor :columns="columns"  label-width="100px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList, rscListDeviceType } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeNetworkDevices extends Vue {
  columns = [
    [
      {type: 'input', label: '设备名称', key: 'name', required: true},
      {type: 'input', label: '设备型号', key: 'model_number', required: true},
    ],
    [
      {type: 'select', label: '设备类型', key: 'device_type', required: true, optList: []},
      {type: 'input', label: '设备vlan', key: 'vlan', required: true},
    ],
    [
      {type: 'select', label: '所属机柜', key: 'cabinet_id', required: true, optList: []},
      {type: 'select', label: '端口速率', key: 'port_speed', optList: []},
    ],
    [
      {type: 'input', label: '光口数量', key: 'optical_port', placeholder: '输入格式如：1-10'},
      {type: 'input', label: '电口数量', key: 'electrical_port', placeholder: '输入格式如：11-15'},
    ],
    [
      {type: 'select', label: '状态', key: 'status', optList: []},
      {type: 'input', label: '管理方式', key: 'mgt_method'},
    ],
    [
      {type: 'input', label: '管理用户', key: 'manager'},
      {type: 'input', label: '管理地址', key: 'mgt_addr'},
    ],
    [
      {type: 'date', label: '保修起始日期', key: 'repair_start_date'},
      {type: 'date', label: '保修结束日期', key: 'repair_end_date'},
    ],
    [
      {type: 'date', label: '上架时间', key: 'active_time'},
      {type: 'date', label: '下架时间', key: 'deactive_time'},
    ],
    [
      {type: 'date', label: '购买日期', key: 'purchase_date'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  getSelect() {
    getSelectList('cabinet').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'cabinet_id');
    });
    rscListDeviceType().then((data: any) => {
      this.columns = pushOptColumns(this.columns, data.device_type, 'device_type');
      this.columns = pushOptColumns(this.columns, data.status, 'status');
      this.columns = pushOptColumns(this.columns, data.port_speed, 'port_speed');
    });
  }

}
</script>
