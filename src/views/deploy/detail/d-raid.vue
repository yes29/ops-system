<template>
 <td-detail title="Raid详情">
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
export default class DRaid extends Vue {
  baseOptList = [
    {title: '类型', key: 'type'},
    {title: '物理机', key: 'pm_server_name'},
    {title: '硬盘', key: 'disk_type'},
    {title: '数量', key: 'disk_num'},
    {title: '容量', key: 'space'},
    {title: '标签', key: 'label'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
