 <template>
  <div class="line-table">
    <el-table
        :data="tableData"
        :height="height"
        @row-click="cliRow">
      <el-table-column v-if="expandList && expandList.length > 0" type="expand" width="30">
        <template slot-scope="props">
          <el-row class="mt10" v-for="item in expandList" :key="item.prop">
           {{item.label}}：{{props.row[item.prop]}}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
          :type="col.prop ==='' ? 'index':''"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align"
          v-for="col in optList"
          :key="col.lable">
      </el-table-column>
    </el-table>
    <slot name="pagination"></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class LineTable extends Vue {
  @Prop({ default: [] }) tableData!: any;
  @Prop({ default: [] }) expandList!: any;
  @Prop({ default: null }) height!: string;
  @Prop({ default: [] }) optList!: any;
  @Prop({ default: Function }) cliRow!: any;
}
</script>
<style lang="scss">
.line-table {
  width: 100%;
  .mt10{
    margin-top: 10px;
  }
  .el-table{
    border: 1px solid 0;
    .cell{
      padding: 4px 0;
    }
    td, th {
      padding: 6px 0;
    }
  }
  .el-table::before{height: 0;}
  tr{
    cursor: pointer;
  }
  .el-table__expand-icon>.el-icon{
    color: rgb(64, 158, 255);
  }
  .el-table__expanded-cell[class*=cell] {
    padding: 10px !important;
    line-height: 24px;
    color: #fff;
  }
  .c-0a9{
    color: #0a92ff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    color: #0a92ff;
  }
  .el-table__empty-block{
    color: #fff;
  }
  td, th.is-leaf {
    border-bottom: 1px solid #ddd;
  }
}
</style>
