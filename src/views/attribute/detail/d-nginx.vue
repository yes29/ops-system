<template>
<div class="clear">
  <td-detail title="Nginx详情" width="780px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <sample-card
        title="Nginx实例"
        ref="sample"
        idKey='nginx_id'
        proxy="service/proxy_service"
        service="nginx/instance"
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
import ExpEditor from './editor/exp-nginx.vue';
@Component({components: {TdDetail, BaseCard, RelevancyCard, SampleCard, ExpEditor}})
export default class DNginx extends Vue {
  baseOptList = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '集群模式', key: 'mode'},
    {title: '备注', key: 'remark'},
  ];
  sampleCardOptList = [
    {title: '主机名', key: 'hostname', className: 'cname', width: '160px'},
    {title: 'ip', key: 'ip', width: '130px'},
    {title: '端口', key: 'port', width: '80px'},
    {title: '备注', key: 'remark'},
  ];

  get row() {
    return DetailModule.row;
  }
}
</script>
