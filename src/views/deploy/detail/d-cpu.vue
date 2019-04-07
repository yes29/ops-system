<template>
 <td-detail title="cpu详情">
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
export default class DCpu extends Vue {
  baseOptList = [
    {title: '品牌', key: 'brand'},
    {title: '型号', key: 'type'},
    {title: '核心数', key: 'core_num', align: 'center'},
    {title: '线程数', key: 'thread_num', align: 'center'},
    {title: '基本频率', key: 'base_freq'},
    {title: '最大频率', key: 'max_freq'},
    {title: '缓存', key: 'cache'},
    {title: '总线速率', key: 'bus'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
