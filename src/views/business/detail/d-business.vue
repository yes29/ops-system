<template>
<div class="clear">
  <td-detail title="业务详情"  width="860px">
    <base-card :row="row" :optList="baseOptList"></base-card>
    <table-card
        title="服务列表"
        :path="'/business' + search"
        :columns ="serviceList"
        :optList="javaList">
    </table-card>
  </td-detail>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import { getBusService } from '@/api/service';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
@Component({components: {TdDetail, BaseCard, TableCard}})
export default class DBusiness extends Vue {
  search = '';
  serviceList: any = [];

  baseOptList = [
    {title: '名称', key: 'name'},
    {title: '关联服务', key: 'service'},
    {title: '资源地址', key: 'url'},
  ];

  javaList = [
    {title: '服务名称', key: 'name', className: 'cname', width: 200},
    {title: '负责人', key: 'manager'},
    {
      title: '实例',
      render(row: any) {
        return row.instances.length + '个';
      },
    },
    {title: '更新时间', key: 'data'},
    {title: '运行状态', key: 'data'},
  ];

  get row() {
    return DetailModule.row;
  }

  // 跑去找服务详情
  mounted() {
    this.search = window.location.search;
  }

  // 监听row的变化
  @Watch('row')
  handleRow(row: any) {
    if (row.service_ids) {
      this.getService(row.service_ids);
    }
  }

  async getService(ids: any) {
    try {
      this.serviceList = await getBusService({ids});
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
<style lang="scss">
 .table-card{
   .el-card__body{
    padding: 6px 20px 22px;
  }
  .next {
    float: right;
    font-size: 16px !important;
    padding: 3px 0 !important;
  }
 }
</style>
