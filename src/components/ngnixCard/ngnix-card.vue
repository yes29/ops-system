 <template>
  <div class="ngnix-card">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="item-header">
          <div class="title">{{title}}</div>
        </div>
        <line-table class="table" :cliRow="getChart" :tableData="tableData" :optList="optList" :expandList = "expandList"></line-table>
        <div class="fs12_24" v-if="type === 'base'">只取1分钟内数据</div>
        <div class="fs12_24" v-if="type === 'msQPS'">统计QPS大于60的域名, 只取1分钟内数据</div>
        <div class="fs12_24" v-if="type === 'msURL'">统计QPS大于10的URL, 只取1分钟内数据</div>
      </el-col>
      <el-col :span="12">
        <div class="item-header">
          <div class="title fs14" v-if="data.url">
            {{data.url}}
          </div>
          <div class="title fs14" v-else="data.domain">	
            {{data.domain}}
          </div>
        </div>
        <div v-loading="loading">
          <line-chart 
              :id="Math.random()"
              seriesName="QPS"
              :data="qps"
              height="260px"
              width="100%"
              title="QPS">
          </line-chart>
          <line-chart
              :id="Math.random()"
              seriesName="延迟" 
              :data="delay"
              unit="ms"
              height="260px"
              width="100%"
              title="延迟"/>
          </line-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { startTime, endTime } from '@/utils/index';
import LineChart from '@/components/echarts/line-one.vue';
import LineTable from '@/components/echarts/line-table.vue';
import { getGraph } from '@/api/monitor';
import { AppModule } from '@/store/modules/app';
@Component({components: {LineChart, LineTable}})
export default class NginxCard extends Vue {
  expandList = [];
  startTime = startTime();
  endTime = endTime();
  data = {};
  loading = false;
  qps = {};
  delay = {};
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) domain!: string;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) api!: string;
  @Prop({ default: [] }) tableData!: any;
  @Prop({ default: [] }) optList!: any;

  // 监听tableData，更新echarts
  @Watch('tableData')
  ontableData(list: any) {
    if (list && list.length > 0) {
      this.getChart(list[0]);
    }
  }

  // 获取store的时间
  get dateResult() {
    return AppModule.dateResult;
  }

  // 监听date，及时请求echars数据
  @Watch('dateResult')
  onDateResult(rest: any) {
    this.startTime = rest.startTime;
    this.endTime = rest.endTime;
    this.getChart(this.data);
  }

  // vue挂载后，挂载echarts
  mounted() {
   if (this.tableData && this.tableData.length > 0) {
      this.getChart(this.tableData[0]);
    }
  }

  // 获取echats数据
  async getChart(row: any) {
    this.data = row;
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
    } as any;
    if (row.domain) {
      params.domain = row.domain;
    }
    // 用于重点域名监控
    if (this.domain) {
      params.domain = this.domain;
    }
    if (row.url) {
      params.url = row.url;
    }
    this.loading = true;
    try {
      const data = await getGraph(this.api, params) as any;
      this.loading = false;
      this.qps = data.qps;
      this.delay = data.delay;
    } catch (e) {
      this.qps = {};
      this.delay = {};
      this.loading = false;
      console.error('error ngnix-card');
    }
  }
}
</script>
<style lang="scss">
 .ngnix-card{
    height: 566px;
    background: #fff;
    // border: 1px solid #444;
  }
  // .br-36 {
  //   border: 1px solid #ddd;
  // }
  .fs12_24{
    font-size: 12px;
    margin: -24px 0 0 20px;
    color: #888;
  }
  .table{
    padding: 10px 20px 20px 20px;
    height: 522px;
    td .cell{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
</style>
