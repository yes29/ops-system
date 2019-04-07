<template>
 <td-detail title="维修记录详情">
   <base-card
        height="calc(100vh - 100px)"
        :row="row"
        :optList="baseOptList">
    </base-card>
 </td-detail>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
@Component({components: {TdDetail, BaseCard}})
export default class DManufacturer extends Vue {

  baseOptList = [
    {title: '维修对象', key: 'maintenance_object_display'},
    {title: '故障类型', key: 'breakdown_type'},
    {title: '故障处理', key: 'fault_treatment'},
    {title: '故障详情', key: 'breakdown_details'},
    {title: '维修日期', key: 'maintenance_time'},
  ];

  get row() {
    return DetailModule.row;
  }
}
</script>
