<template>
 <td-detail title="内存详情">
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
export default class DMemory extends Vue {
  baseOptList = [
    {title: '品牌', key: 'brand'},
    {title: '型号', key: 'type'},
    {title: '容量', key: 'space'},
    {title: '工作电压', key: 'voltage'},
    {title: '频率', key: 'frequency'},
    {title: '制造商', key: 'manufacturer'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
