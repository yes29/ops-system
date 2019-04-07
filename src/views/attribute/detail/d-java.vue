<template>
<div class="clear">
  <td-detail title="Java详情" width="780px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <sample-card
        title="Java实例"
        ref="sample"
        idKey='java_service_id'
        proxy="service/service"
        service="java/instance"
        :row="row"
        :columns="sampleCardOptList">
    </sample-card>
    <relevancy-card :row="row" ref="relevancy"></relevancy-card>
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
import ExpEditor from './editor/exp-java.vue';
@Component({components: {TdDetail, BaseCard, RelevancyCard, SampleCard, ExpEditor}})
export default class DJava extends Vue {
  baseOptList = [
    {title: '名称', key: 'name'},
    {title: '简称', key: 'short_name'},
    {title: '服务描述', key: 'describe'},
    {title: '负责人', key: 'manager'},
    {title: '语言', key: 'development_language'},
    {title: '项目组', key: 'project_team_name'},
    {title: '部署路径', key: 'dpy_path'},
    {title: '启动参数', key: 'run_arg'},
    {title: '运行环境', key: 'env_arg'},
    {title: '备注', key: 'remark'},
  ];

   sampleCardOptList = [
    {title: '主机名', key: 'hostname', className: 'cname', width: '160px'},
    {title: 'ip', key: 'ip', width: '130px'},
    {title: '端口', key: 'port', width: '80px'},
    {title: '版本', key: 'version'},
    {title: '分组名', key: 'group', align: 'center'},
    {title: '备注', key: 'remark'},
  ];

  get row() {
    return DetailModule.row;
  }
}
</script>
