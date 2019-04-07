<template>
  <el-dialog
      custom-class="modal-editor"
      :title="title"
      :width="width"
      :visible.sync="visible"
      :before-close="handleClose">
  <el-form 
      class="mt20"
      ref="params"
      :model="params"
      :label-width="labelWidth">
    <slot v-for="row in columns">
      <el-row :gutter="20" v-if="row.length === 2">
        <el-col :span="12" v-for="(item, index) in row" :key="index">
          <form-item :item="item" :params="params"></form-item>
        </el-col>
      </el-row> 
      <form-item v-else :item="row[0]" :params="params"></form-item>
    </slot>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" :loading="btnLoading" @click="onSubmit(params)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import FormItem from './form-item.vue';
import { post } from '@/api/common';
import { throws } from 'assert';
import { setTimeout } from 'timers';
@Component({components: {FormItem}})
export default class ModalEditor extends Vue {
  @Prop() api!: string;
  @Prop({ default: [] }) columns!: any;
  @Prop({ default: '620px' }) width!: string;
  @Prop({ default: '80px' }) labelWidth!: string;
  @Prop({ default: '编辑' }) title!: string;
  btnLoading = false;

  // 是否显示
  get visible() {
    return ModalEditorModule.modalShow;
  }

  // 获取参数
  get params() {
    return ModalEditorModule.modalData;
  }

 // 关闭
  handleClose() {
    const refs: any = this.$refs.params;
    refs.resetFields();
    ModalEditorModule.modalClose();
  }

  // 点击确认
  onSubmit(params: any) {
    const refs: any = this.$refs.params;
    refs.validate((valid: boolean) => {
      if (valid) {
        const data: any = {};
        for (const k of this.columns) {
          for (const n of k) {
            // 非null不传给后台，key 为noValue不传给后台、当params[n.key]为0时，if读取到为false，加判断
            if ((params[n.key] || params[n.key] === 0) && n.key !== 'noValue') {
              data[n.key] = params[n.key];
            }
          }
        }
        if (params.id) {
          data.id = params.id;
        }
        this.post(data);
      }
    });
  }

  // post提交
  async post(data: any) {
    this.btnLoading = true;
    try {
      await post(this.api, data);
      this.btnLoading = false;
      let chart: any = '新增';
      if (data.id) { chart = '修改'; }
      this.$message({
        type: 'success',
        message: '数据' + chart + '成功！',
      });
      this.handleClose();
      this.$emit('upup'); // 外抛
    } catch (err) {
      this.btnLoading = false;
      console.error(err);
    }
  }
}
</script>
<style lang="scss">
.modal-editor {
  .el-dialog__body {
    padding: 0 40px 0 30px;
  }
  .el-dialog__title {
    font-weight: bold;
    font-size: 15px;
    color: #555;
  }
}

</style>