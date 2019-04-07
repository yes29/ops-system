<template>
<div class="m-business">
  <div class="item-header">
    <div class="title">汇总&nbsp;--&nbsp;{{$route.query.service_name}}</div>
  </div>
  <el-row class="ba-fff">
    <el-col :span="6">
      <pv-tps ref="pvTps" title="访问量" height="340px" top="90"></pv-tps>
    </el-col>
    <el-col :span="6">
      <response-time ref="responseTime" title="响应时间" height="340px" top="90"></response-time>
    </el-col>
    <el-col :span="6">
      <response-rate ref="responseRate" title="成功率" height="340px" top="90"></response-rate>
    </el-col>
    <el-col :span="6"> 
      <status-code ref="statusCode" title="响应状态码"  height="340px" top="90"></status-code>
    </el-col>
  </el-row>
  <div class="item-header mt20" v-if="urlOptList.length > 0">
    <div class="title">URL&nbsp;--&nbsp;访问量</div>
    <el-select
        v-model="selectUrl"
        value-key="id"
        class="url-select"
        @visible-change="changeUrl"
        @remove-tag="changeUrl"
        multiple
        filterable
        collapse-tags
        placeholder="可选择你要查看的URL">
      <el-option
        v-for="item in urlOptList"
        :key="item.id"
        :label="item.uri"
        :value="item">
      </el-option>
      </el-select>
  </div>
  <el-row class="ba-fff" v-if="urlList.length > 0">
    <el-col :span="8" v-for="(item, index) in urlList" :key="index">
      <pv-tps-url :item="item" :params="params"></pv-tps-url>
    </el-col>
  </el-row>
  <div v-if="instanceList.length > 0"
      class="w_100"
      v-for="(item, index) in instanceList"
      :key="index">
    <div class="item-header mt20">
      <div class="title">主机&nbsp;--&nbsp;{{item.hostname}}（{{item.ip}}）</div>
    </div>  
    <host-instance :ip="item.ip" :startTime="startTime" :endTime="endTime"></host-instance>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { startTime60, endTime } from '@/utils/index';
import { getJavaInstance, getServiceUrl } from '@/api/service';
import PvTps from './components/basePart/pv-tps.vue';
import ResponseTime from './components/basePart/response-time.vue';
import StatusCode from './components/basePart/status-code.vue';
import ResponseRate from './components/basePart/response-rate.vue';
import PvTpsUrl from './components/pv-tps-url.vue';
import HostInstance from './components/host-instance.vue';
@Component({
  components: {
    PvTps,
    ResponseTime,
    StatusCode,
    ResponseRate,
    PvTpsUrl,
    HostInstance,
  },
})
export default class MService extends Vue {
  startTime = startTime60();
  endTime = endTime();
  instanceList: any  = [];
  params: any = {};
  selectUrl = [];
  urlList: any = [];
  urlOptList = [];

  mounted() {
    this.getCharts();
  }

// 时间日期组件
 get dateResult() {
    return AppModule.dateResult;
  }

  // 选择指定日期--查询数据
  @Watch('dateResult')
  onDateResult(rest: any) {
    if (rest.startTime === 0) {
      this.startTime = startTime60();
      this.endTime = endTime();
    } else {
      this.startTime = rest.startTime;
      this.endTime = rest.endTime;
    }
    this.getCharts();
  }

  // url访问量选择指定url
  changeUrl(event: any) {
    if (event === false || event.id) {
      this.urlList = [];
      setTimeout(() => {
        // if (this.selectUrl.length < 0) { return; }
        this.urlList = this.selectUrl;
      }, 50);
    }
  }

  // 获取图表入口
  getCharts() {
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
      service_name: this.$route.query.service_name,
    };
    this.params = params;
    const refs: any = this.$refs;
    refs.pvTps.getChart(params);
    refs.responseTime.getChart(params);
    refs.statusCode.getChart(params);
    refs.responseRate.getChart(params);
    this.getSystemUrl();
    this.getInstance();
  }

  // 获取该服务下的url
  async getSystemUrl() {
    try {
      const params = {
        ids: [this.$route.query.id],
      };
      this.urlList = [];
      this.urlOptList = [];
      const result: any = await getServiceUrl(params);
      if (result && result.length > 0 && result[0].data && result[0].data.length > 0) {
        const list = result[0].data;
        let num = 0;
        for (const k of list) {
          if (num < 3) {
            this.urlList.push(k);
          }
          num++;
        }
        this.urlOptList = list;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 获取该服务下的实例
  async getInstance() {
    try {
      const params = {
        page: 1,
        size: 1000,
        filter: {
          java_service_id: this.$route.query.id,
        },
      };
      this.instanceList = await getJavaInstance(params);
    } catch (err) {
      console.error(err);
    }
  }

}
</script>
<style lang="scss">
@import './m-business.scss';
</style>
