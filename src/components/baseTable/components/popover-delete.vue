<template>
<el-popover
    placement="top"
    width="180"
    v-model="visible">
  <p>你确定要删除该数据？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="hanleDelete(row)">确定</el-button>
  </div>
  <el-button 
      slot="reference"
      class="danger"
      type="text"
      size="small"
      icon="el-icon-delete"
      @click="visible = true">删除
  </el-button>
</el-popover>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class PopoverDelete  extends Vue {
  @Prop({ default: {} }) row!: object;
  visible = false;
  hanleDelete(row: any) {
    this.visible = false;
    this.$emit('onDelete', [row]);
  }
}
</script>
