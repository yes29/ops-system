<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { rscHardware } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeMaintainRecord extends Vue {
  breakdownTypeSelList = ['硬盘损坏', '内存损坏', '网卡损坏', '主板损坏', ' 端口损坏', '主机故障', ' 阵列卡故障'];
  columns = [
    [
      {type: 'cascader', label: '维修对象', key: 'maintenance_object', optList: [], required: true},
    ],
    [
      {type: 'selStr', label: '故障类型', key: 'breakdown_type', optList: this.breakdownTypeSelList, required: true},
    ],
    [
      {type: 'date', label: '维修日期', key: 'maintenance_time', required: true},
    ],
    [
      {type: 'input', label: '故障处理', key: 'fault_treatment'},
    ],
    [
      {type: 'input', label: '故障详情', key: 'breakdown_details'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  getSelect() {
    rscHardware().then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'maintenance_object');
    });
  }

}
</script>
