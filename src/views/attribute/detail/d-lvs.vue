<template>
<div class="clear">
  <td-detail title="Lvs详情" width="780px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <sample-card
        title="Lvs实例"
        ref="sample"
        idKey='lvs_id'
        proxy="service/proxy_service"
        service="lvs/instance"
        :row="row"
        :columns="sampleCardOptList">
      </sample-card>
    <relevancy-card :row="row" ref="relevancy" api="proxy_"></relevancy-card>
  </td-detail>
  <exp-editor @upup="$refs.sample.geDataList()" :row="row"></exp-editor>
 </div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import RelevancyCard from './components/relevancy-card.vue';
import SampleCard from './components/sample-card.vue';
import ExpEditor from './editor/exp-lvs.vue';
@Component({components: {TdDetail, BaseCard, RelevancyCard, SampleCard, ExpEditor}})
export default class DLvs extends Vue {
  baseOptList = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '集群模式', key: 'mode'},
    {title: '会话保持', key: 'session_time', align: 'center'},
    {title: '版本', key: 'version'},
    {title: 'vip', key: 'vip'},
    {title: '协议', key: 'protocol'},
    {title: '调度算法', key: 'algorithm', align: 'center'},
    {title: '转发规则', key: 'transpond_rule', align: 'center'},
    {title: '健康检查', key: 'health_check', align: 'center'},
  ];
  sampleCardOptList = [
    {title: '主机名', key: 'hostname', className: 'cname', width: '160px'},
    {title: 'ip', key: 'ip', width: '130px'},
    {title: '端口', key: 'port', width: '80px'},
    {title: '权重', key: 'weight'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
