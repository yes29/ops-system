<template>
<div class="clear">
  <td-detail title="服务详情" width="860px">
    <base-card width="50%" :row="row" :optList="baseOptList"></base-card>
    <td-card title="监控概览">
      <el-row class="w_100">
        <el-col :span="12">
          <pv-tps title="访问量"  ref="pvTps" :showTrend="false"></pv-tps>
        </el-col>
        <el-col :span="12">
          <response-time title="响应时间"  ref="responseTime" :showTrend="false"></response-time>
        </el-col>
      </el-row>
      <el-row class="w_100">
        <el-col :span="12">
          <status-code title="响应状态码" ref="statusCode"></status-code>
        </el-col>
        <el-col :span="12">
          <response-rate title="成功率"  ref="responseRate" :showTrend="false"></response-rate>
        </el-col>
      </el-row>
    </td-card>
    <div v-if="instanceList.length > 0"
        v-for="(item, index) in instanceList"
        :key="index">
      <td-card :title="'主机 --'  + item.hostname +'（' + item.ip + '）'">
        <host-instance :ip="item.ip"></host-instance>
      </td-card>
    </div>
  </td-detail> 
 </div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import { getJavaInstance } from '@/api/service';
import TdDetail from '@/components/detail/detail.vue';
import TdCard from '@/components/detail/card/card.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import PvTps from '@/views/business/monitor/components/basePart/pv-tps.vue';
import ResponseTime from '@/views/business/monitor/components/basePart/response-time.vue';
import StatusCode from '@/views/business/monitor/components/basePart/status-code.vue';
import ResponseRate from '@/views/business/monitor/components/basePart/response-rate.vue';
import HostInstance from './host-instance.vue';
@Component({
  components: {
    TdDetail,
    BaseCard,
    TdCard,
    PvTps,
    ResponseTime,
    StatusCode,
    ResponseRate,
    HostInstance,
  },
})
export default class DBusiness extends Vue {
  instanceList: any  = [];
  baseOptList = [
    {title: '名称', key: 'name'},
    {title: '简称', key: 'short_name'},
    {title: '服务描述', key: 'describe'},
    {title: '负责人', key: 'manager'},
    {title: '语言', key: 'development_language'},
    {title: '部署路径', key: 'dpy_path'},
    {title: '启动参数', key: 'run_arg'},
    {title: '运行环境', key: 'env_arg'},
    {title: '备注', key: 'remark'},
  ];

  get row() {
    return DetailModule.row;
  }

  // 监听row, 处理请求接口
  @Watch('row')
  handleRow(row: any) {
    setTimeout(() => {
      this.getMonitor(row);
    }, 10);
    this.getInstance(row);
  }

  // 获取监控概览数据
  async getMonitor(row: any) {
    if (!row.short_name) { return; }
    const params = {
     service_name: row.name,
    };
    const refs: any = this.$refs;
    refs.pvTps.getChart(params);
    refs.responseTime.getChart(params);
    refs.statusCode.getChart(params);
    refs.responseRate.getChart(params);
  }

  // 获取该服务下的实例
  async getInstance(row: any) {
    try {
      const params = {
        page: 1,
        size: 1000,
        filter: {
          java_service_id: row.id,
        },
      };
      this.instanceList = await getJavaInstance(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
