<template>
  <el-dialog
      title="编辑网卡"
      width="520px"
      :visible.sync="show"
      :before-close="handleClose">
    <el-form
        ref="params"
        class="mt20"
        label-position="right"
        label-width="48px"
        :model="params">
      <el-form-item class="mb20" label="ip">
        <el-input v-model="params.ip"></el-input>
      </el-form-item>
      <el-form-item class="mb20" label="mac">
        <el-input v-model="params.mac"></el-input>
      </el-form-item>
      <el-form-item class="mb20" label="name">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item class="mb20" label="speed">
        <el-input v-model="params.speed"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSavue(params)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop} from 'vue-property-decorator';
@Component
export default class AdeNetworkCard extends Vue {
  @Prop({ default: {} }) addEdit!: object;
  show = false;
  params = {};

  @Watch('addEdit')
  setParams(row: any) {
    this.params = row;
  }

  handleClose() {
    this.show = false;
    const refs: any = this.$refs.params;
    refs.resetFields();
  }

  onSavue(params: object) {
    this.handleClose();
    this.$emit('onSavue', params);
  }
}
</script>
