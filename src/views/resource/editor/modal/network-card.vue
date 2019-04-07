<template>
  <div class="network-card">
    <td-select  
        @click.native="showTable = true"
        v-model="names"
        :placeholder="'请选择' + item.label">
    </td-select>
    <ade-network-card ref="ade" :addEdit="addEdit" @onSavue="saveAddEdit"></ade-network-card>
    <el-dialog
        title="编辑网卡"
        width="720px"
        :visible.sync="showTable"
        :before-close="handleClose">
      <div class="add" @click="$refs.ade.show = true; addEdit = {}">
        <i class="ivu-icon ivu-icon-md-add"></i>新增网卡
      </div>  
      <el-table
          :height="300"
          :data="tableData"
          style="width: 100%">
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="mac" label="mac"></el-table-column>
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="speed" label="speed"></el-table-column>
        <el-table-column
            min-width="100"
            align="left"
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <popover-delete :row="scope.row" @onDelete="handleDelete(scope.row)"></popover-delete>
          </template>
      </el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit(tableData)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import AdeNetworkCard from './ade-network-card.vue';
import PopoverDelete from '@/components/baseTable/components/popover-delete.vue';
import TdSelect from '@/components/select/td-select.vue';
@Component({components: {PopoverDelete, AdeNetworkCard, TdSelect}})
export default class NetworkCard extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: {} }) item!: object;
  showTable: boolean = false;
  addEdit: any = {};
  tableData: any = [];
  names = '';

  // 监听params， 设置表格数据
  @Watch('params')
  setNetCard(rest: any) {
    if (!rest.network_card) {
      rest.network_card = '[]';
    }
    const list = JSON.parse(rest.network_card);
    for (const k of list) {
      if (!k.id) {
        k.id = Date.now();
      }
    }
    this.setNCP(list);
    this.tableData = list;
  }

  // 确认表格网卡数据
  onSubmit(list: any) {
    this.setNCP(list);
    this.handleClose();
  }

  // 设置name及submit的数据
  setNCP(list: any) {
    let num = 0;
    let names = '';
    for (const k of list) {
      if (num === 0) {
        names = k.ip;
      } else {
        names += '，' + k.ip;
      }
      num++;
    }
    this.names = names;
    this.params.network_card = JSON.stringify(list);
  }

  // 保存新增和编辑到表格
  saveAddEdit(row: any) {
    if (!row.id) {
      row.id = Date.now();
      this.tableData.push(row);
    } else {
      const list = this.tableData;
      const arr = [];
      for (const k of list) {
        if (row.id === k.id) {
          arr.push(row);
        } else {
          arr.push(k);
        }
      }
      this.tableData = arr;
    }
  }

  // 点击编辑处理
  handleEdit(row: object) {
    this.addEdit = row;
    const ade: any = this.$refs.ade;
    ade.show = true;
  }

  // 点击删除处理
  handleDelete(row: any) {
    const arr = [];
    const list: any = this.tableData;
    for (const k of list) {
      if (k.id !== row.id) {
        arr.push(k);
      }
    }
    this.tableData = arr;
  }

  // 关闭弹窗
  handleClose() {
    this.showTable = false;
  }
}
</script>

<style lang="scss">
.network-card{
  .add {
    color: #2d8cf0;
    font-size: 15px;
    padding: 0 5px;
    text-align: right;
    cursor: pointer;
  }
  .el-dialog__body {
    padding: 0px 26px 10px;
  }
  .el-dialog__header {
    padding: 12px 20px 10px;
  }
  .el-table{
    border-top: 1px solid #ebeef5;
    th {
      padding: 4px 0;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .el-button {
      padding: 5px 12px 5px 0;
      font-size: 13px;
    }
    .cell{
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
