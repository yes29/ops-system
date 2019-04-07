<template>
 <td-detail title="厂商信息详情">
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
    {title: '名称', key: 'name'},
    {title: '联系人', key: 'link_name'},
    {title: '电话', key: 'phone'},
    {title: '邮箱', key: 'email'},
    {title: '网址', key: 'website'},
    {title: '地址', key: 'address'},
  ];

  get row() {
    return DetailModule.row;
  }

}
</script>
