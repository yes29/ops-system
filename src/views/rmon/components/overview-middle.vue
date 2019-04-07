 <template>
  <div class="collect-sql">
    <el-row class="mt20" :gutter="20">
      <el-col :span="12" v-loading="slowSqlLoading">
        <div class="ba-255">
           <div class="item-header">
            <div class="title">数据库主从延迟</div>
          </div>
          <line-table
              class="table"
              :cliRow="sqlRow"
              :tableData="dbCTimeList"
              :optList="dbCTimeOpt"
              :expandList="[]">
          </line-table>
        </div>
      </el-col>
      <el-col :span="12" v-loading="dbCTimeLoading">
        <div class="ba-255">
          <div class="item-header">
            <div class="title">慢查询语句&nbsp;Top10</div>
            <el-select 
                @change="getSlowSqlTop"
                v-model="selValue"
                class="select"
                placeholder="请选择延迟时间">
              <el-option
                v-for="item in selListOps"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <line-table
              class="table"
              :cliRow="sqlRow"
              :tableData="slowSqlList"
              :optList="slowSqlOps"
              :expandList="expandList"
              height="440">
          </line-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { startTime, endTime } from '@/utils/index';
import LineTable from '@/components/echarts/line-table.vue';
import { getSlowSqlTop10, getAllDbCurrentDelayTime } from '@/api/java';
import { AppModule } from '@/store/modules/app';
import { setTimeout } from 'timers';
@Component({components: {LineTable}})
export default class OverviewMiddle extends Vue {
  slowSqlLoading = false;
  dbCTimeLoading = false;
  startTime = startTime();
  endTime = endTime();
  selValue = 5;

  selListOps = [
    {id: 1, label: '延迟1秒以上'},
    {id: 5, label: '延迟5秒以上'},
    {id: 10, label: '延迟10秒以上'},
    {id: 15, label: '延迟15秒以上'},
    {id: 20, label: '延迟30秒以上'},
    {id: 30, label: '延迟30秒以上'},
    {id: 60, label: '延迟60秒以上'},
  ];

  dbCTimeOpt = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '数据库名', prop: 'dbName'},
    {label: '实例', prop: 'example'},
    {label: '延迟(s)', prop: 'currentDelayTime', width: '100', align: 'center'},
  ];

  expandList = [
    {label: '数据库名', prop: 'databaseType'},
    {label: 'trace', prop: 'trace'},
    {label: 'sqlId', prop: 'sqlId'},
    {label: 'Query', prop: 'sql'},
  ];

  dbCTimeList: any = [];
  slowSqlOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '数据库名', prop: 'databaseType'},
    {label: 'trace', prop: 'trace'},
    {label: 'sqlId', prop: 'sqlId'},
    {label: '延迟(ms)', prop: 'sqlUsedTime', width: '100', align: 'center'},
  ];

  slowSqlList = [];

  @Watch('dateResult')
  onDateResult(rest: any) {
    this.startTime = rest.startTime;
    this.endTime = rest.endTime;
    this.getDataList();
  }

  mounted() {
   this.getDataList();
  }

  sqlRow(row: any) { // 组件原因，摆这里不动
    console.log(row);
  }

  async getDataList() {
    // 数据库评价延迟
    this.dbCTimeLoading = true;
    getAllDbCurrentDelayTime().then((list: any) => {
        this.dbCTimeLoading = false;
        const arr = [];
        for (let i = 0; i < list.length; i++) {
          list[i].example = list[i].ip + ' : ' + list[i].port;
          list[i].currentDelayTime = list[i].currentDelayTime / 1000;
          if (i < 10) {
            arr.push(list[i]);
          }
        }
        this.dbCTimeList = arr;
    })
    .catch((err: any) => {
      this.dbCTimeLoading = false;
    });
    this.getSlowSqlTop();
  }

  getSlowSqlTop() {
    // 全站URL延迟 Top10
    this.slowSqlLoading = true;
    this.slowSqlList = [] as any;
    getSlowSqlTop10({
      usedTime: this.selValue,
      start: this.startTime,
      end: this.endTime,
    }).then((list: any) => {
      this.slowSqlLoading = false;
      for (const k of list) {
        k.db = k.databaseType + ' : ' + k.dataSourceKey;
      }
      this.slowSqlList = list;
    })
    .catch((err) => {
      this.slowSqlLoading = false;
    });
  }
}
</script>
<style lang="scss">
.collect-sql{
  margin-top: 20px;
  .ba-255{
    background: #fff;
  }
  .select {
    width: 140px;
    float: right;
    .el-input__inner{
      background:#ebf5ff;
      height: 28px;
      line-height: 28px;
      width: 140px;
      border: 1px solid #ccc;
    }
    .el-input__icon {
        line-height: 26px;
      }
  }
  .el-table__header{
    width: 100%;
  }
}
</style>
