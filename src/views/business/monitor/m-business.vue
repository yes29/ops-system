<template>
<div class="m-business">
  <!--业务概览-->
  <div class="item-header">
    <div class="title">业务概览</div>
  </div>
  <el-row class="ba-fff">
    <el-col :span="6">
      <pv-tps ref="pvTps"></pv-tps>
    </el-col>
    <el-col :span="6">
      <response-time ref="responseTime"></response-time>
    </el-col>
    <el-col :span="6">
      <response-rate ref="responseRate"></response-rate>
    </el-col>
    <el-col :span="6">
      <status-code ref="statusCode"></status-code>
    </el-col>
  </el-row>

  <!-- 关联服务 -->
  <div class="item-header mt20" v-if="urlOptList.length > 0">
    <div class="title">关联服务</div>
    <el-select
        v-model="selectService"
        class="url-select"
        @visible-change="changeService"
        @remove-tag="changeService"
        multiple
        filterable
        collapse-tags
        placeholder="可选择你要查看的服务">
      <el-option
        v-for="(item, index) in serviceOptList"
        :key="index"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
  <slot v-for="item in serviceList"  v-if="serviceList.length">
    <business-service :params="params" :serviceName="item"></business-service>
  </slot>

  <!--关联重点url-->
  <div class="item-header mt20" v-if="urlOptList.length > 0">
    <div class="title">重点URL</div>
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
  <slot v-for="(item, index) in urlList">
    <empha-url :item="item" :params="params"></empha-url>
  </slot>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { startTime60, endTime } from '@/utils/index';
// 业务概览
import PvTps from './components/businessGather/pv-tps.vue';
import ResponseTime from './components/businessGather/response-time.vue';
import StatusCode from './components/businessGather/status-code.vue';
import ResponseRate from './components/businessGather/response-rate.vue';
// 重点URL
import { getEmphaUrl} from '@/api/monitor';
import EmphaUrl from './components/empha-url.vue';
// 关联服务
import BusinessService from './components/business-service.vue';
import { setTimeout } from 'timers';
@Component({components: {
  PvTps,
  ResponseTime,
  StatusCode,
  ResponseRate,
  EmphaUrl,
  BusinessService,
}})
export default class MBusiness extends Vue {
  params: any = {
    startTime: startTime60(),
    endTime: endTime(),
  };
  // 重点URL
  selectUrl = [];
  urlOptList: any = [];
  urlList: any = [];

  // 关联服务
  selectService: any = [];
  serviceOptList: any = [];
  serviceList: any = [];

  // 项目初始化
  mounted() {
    const query = this.$route.query;
    const service: any = decodeURIComponent(query.service);
    this.params.id = query.id;
    if (service && service.length > 0) {
      const list = service.split('，');
      this.serviceList.push(list[0]);
      this.serviceOptList = list;
    }
    this.getCharts();
  }

  // 获取时间日期
  get dateResult() {
    return AppModule.dateResult;
  }

  // 监控时间日期
  @Watch('dateResult')
  onDateResult(rest: any) {
    if (rest.startTime === 0) {
      this.params = {
        startTime: startTime60(),
        endTime: endTime(),
      };
    } else {
      this.params = {
        startTime:  rest.startTime,
        endTime: rest.endTime,
      };
    }
    this.getCharts();
  }

 // url访问量选择指定url
  changeUrl(event: any) {
    if (event === false || event.id) {
      this.urlList = [];
      setTimeout(() => {
        this.urlList = this.selectUrl;
      }, 50);
    }
  }

  changeService(event: any) {
    if (event === false || event.length > 0) {
      this.serviceList = [];
      setTimeout(() => {
        this.serviceList = this.selectService;
      }, 50);
    }
  }

  // 获取chart入口
  getCharts() {
    this.params.id = this.$route.query.id;
    const refs: any = this.$refs;
    refs.pvTps.getChart(this.params);
    refs.responseTime.getChart(this.params);
    refs.statusCode.getChart(this.params);
    refs.responseRate.getChart(this.params);
    this.getEmphaUrl();
  }

  // 获取url
  async getEmphaUrl() {
    try {
      const list: any = await getEmphaUrl(this.params);
      const arr = [];
      let num = 0;
      for (const row of list) {
        if (!row.uris) { return; }
        for (const col of row.uris) {
          arr.push({
            service_name: row.service_name,
            id: col.id,
            uri: col.uri,
          });
          if (num < 1) { // 页面初始，只要三个就够了
            this.urlList.push({
              service_name: row.service_name,
              id: col.id,
              uri: col.uri,
            });
          }
          num++;
        }
      }
      this.urlOptList = arr;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
<style lang="scss">
@import './m-business.scss';
</style>
