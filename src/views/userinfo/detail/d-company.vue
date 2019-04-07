<template>
 <td-detail title="公司详情">
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
export default class DCompany extends Vue {
  baseOptList = [
    {title: '名称', key: 'name'},
    {title: '组织', key: 'organization'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
