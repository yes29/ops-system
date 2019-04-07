<template>
<el-dialog
    width="480px"
    class="mt30 ep-cascader"
    title="关联设备"
    :visible.sync="value"
    :before-close="handleClose">
   <el-cascader
      filterable
      clearable
      placeholder="请关联设备"
      :options="options"
      v-model="row.value">
  </el-cascader>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit(row)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class EpC extends Vue {
  @Prop({ default: false }) value!: boolean;
  @Prop({ default: [] }) options!: any;
  @Prop({ default: {} }) row!: any;

  onSubmit(row: any) {
    row.o_device_type_detail = '';
    row.o_device_type = ''; // 编辑用
    row.o_device_name = '';
    row.o_device_id = ''; // 编辑用
    row.pid = '';
    row.o_port_name = '';
    for (const M of this.options) {
      if (M.value === row.value[0]) {
        row.o_device_type_detail = M.label;
        row.o_device_type = M.value;
      }
      for (const N of M.children) {
        if (N.value === row.value[1]) {
          row.o_device_name = N.name;
          row.o_device_id = N.value;
        }
        for (const O of N.children) {
          if (O.value === row.value[2]) {
            row.o_port_name = O.label;
            row.pid = O.value;
          }
        }
      }
    }
    this.$emit('updateTable', row);
    this.handleClose();
  }

  // 关闭
  handleClose() {
    this.$emit('input', false);
  }
}
</script>
<style lang="scss">
.ep-cascader{
  .el-dialog__body{
    padding: 30px !important;
  }
  .el-input{
    width: 420px;
  }
}
</style>
