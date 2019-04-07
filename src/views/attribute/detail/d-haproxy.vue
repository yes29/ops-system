<template>
<div class="clear">
  <td-detail title="Haproxy详情" width="780px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <sample-card
        title="haproxy实例"
        ref="sample"
        idKey='haproxy_id'
        proxy="service/proxy_service"
        service="haproxy/instance"
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
import ExpEditor from './editor/exp-haproxy.vue';
@Component({components: {TdDetail, BaseCard, RelevancyCard, SampleCard, ExpEditor}})
export default class DHaproxy extends Vue {
  baseOptList = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '集群模式', key: 'mode'},
    {title: '连接地址', key: 'connect_address'},
    {title: '后台地址', key: 'manage_address'},
    {title: '后台密码', key: 'manage_user'},
  ];
  sampleCardOptList = [
    {title: '主机名', key: 'hostname', className: 'cname', width: '160px'},
    {title: 'ip', key: 'ip', width: '130px'},
    {title: '端口', key: 'port', width: '80px'},
    {title: '备用节点', key: 'is_backup_detail', align: 'center'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
