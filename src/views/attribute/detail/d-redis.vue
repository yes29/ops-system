<template>
<div class="clear">
  <td-detail title="Redis详情" width="780px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <sample-card
        title="Redis实例"
        ref="sample"
        idKey='redis_service_id'
        proxy="service/db_service"
        service="redis/instance"
        :row="row"
        :columns="sampleCardOptList">
      </sample-card>
    <relevancy-card :row="row" ref="relevancy" api="db_"></relevancy-card>
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
import ExpEditor from './editor/exp-redis.vue';
@Component({components: {TdDetail, BaseCard, RelevancyCard, SampleCard, ExpEditor}})
export default class DRedis extends Vue {
  baseOptList = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '集群模式', key: 'mode'},
    {title: '认证密码', key: 'auth_pass'},
    {title: '集群名', key: 'master_name'},
    {title: 'service_db', key: 'service_db'},
    {title: 'HA连接地址', key: 'ha_address'},
    {title: '哨兵地址', key: 'sentinel_address'},
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
