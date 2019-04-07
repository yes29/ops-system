<template>
<div class="edit-port">
  <ep-cascader
      v-model="cascader"
      :row="row"
      :options="options"
      @updateTable="updateTable">
  </ep-cascader>
  <el-dialog
      width="640px"
      title="编辑端口"
      :visible.sync="show"
      :before-close="handleClose">
      <el-table
          height="330"
          :data="tableData">
        <el-table-column prop="port_name" label="端口" align="center" width="60"></el-table-column>
        <el-table-column prop="port_type_detail" label="端口类型" align="center" width="80"></el-table-column>
        <el-table-column prop="o_device_type_detail" label="设备类型" align="center"></el-table-column>
        <el-table-column prop="o_device_name" label="设备名称" align="center"></el-table-column>
        <el-table-column prop="o_port_name" label="设备端口" align="center"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
      </el-table-column>
    </el-table>  
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" v-loading="btnLoading" @click="onSubmit(tableData)">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { rscAllListDevice, rscAssignPort } from '@/api/cmdb';
import EpCascader from './ep-cascader.vue';
@Component({components: {EpCascader}})
export default class EditPort extends Vue {
  @Prop() list!: any;
  @Prop() value!: any;
  tableData: any = [];
  options: any = [];
  row = [];
  show: boolean = false;
  cascader: boolean = false;
  btnLoading = false;

  // 监听表格list，更新表格
  @Watch('list')
  handleRow(list: any) {
    if (!list) { return; }
    this.tableData = list;
    this.getDeviceList();
  }

  // 获取网络设备级联
  async getDeviceList() {
    this.btnLoading = true;
    try {
      this.btnLoading = false;
      this.options = await rscAllListDevice();
    } catch (err) {
      this.btnLoading = false;
      console.error(err);
    }
  }

  // 编辑端口数据
  handleEdit(row: any) {
    if (row.pid) {
      row.value = [row.o_device_type, row.o_device_id, row.pid];
    }
    this.row = Object.assign({}, row);
    this.cascader = true;
  }

  // 更新表格数据
  updateTable(row: any) {
    const arr: any = [];
    for (const k of this.tableData) {
      if (k.id === row.id) {
        arr.push(row);
      } else {
        arr.push(k);
      }
    }
    this.tableData = arr;
  }

  // 提交编辑好的端口数据
  async onSubmit(list: any) {
    // 提取arr数据
    const arr = [];
    for (const k of list) {
      arr.push({port_id: k.id, pid: k.pid});
    }
    try {
      await rscAssignPort(arr);
      this.$message({
        type: 'success',
        message: '数据修改成功！',
      });
      this.$emit('input', list);
      this.handleClose();
      this.$emit('upup');
    } catch (err) {
      console.error(err);
    }
  }

  // 关闭
  handleClose() {
    this.show = false;
  }
}
</script>
<style lang="scss">
.edit-port{
  .el-dialog__header{
    background: #fff;
    padding: 19px 20px 10px;
  }
  .el-dialog__body{
    padding: 0px;
    margin-top: -10px;
  }
  .el-dialog__footer{
    padding-top: 20px;
  }
}
</style>
