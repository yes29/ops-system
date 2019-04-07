 <template>
  <el-row :gutter="20">
    <el-col class="mt20" :span="12" v-for="item in list" :key="item.url">
      <div class="item-header">
        <div class="title">{{item.name}}</div>
      </div>
      <el-row class="ba-fff">
        <el-col :span="12">
          <td-java-chart :url="item.url" api="important/business/qps" seriesName="请求量" title="请求量"></td-java-chart>
        </el-col>
        <el-col :span="12">
          <td-java-chart :url="item.url" api="important/business/err" seriesName="错误数" title="错误数"></td-java-chart>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {importantBusinessUrls } from '@/api/java';
import TdJavaChart from './java-chart.vue';
@Component({components: {TdJavaChart}})
export default class Bottom extends Vue {
  list = [] as any;
  mounted() {
    importantBusinessUrls().then((list: any) => {
      this.list = list;
    });
  }
}
</script>

