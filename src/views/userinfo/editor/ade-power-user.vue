<template>
  <el-dialog
    width="580px"
    class="attr-transfer"
    title="关联用户"
    :visible.sync="visible"
    :before-close="handleClose">
      <el-transfer
          filterable
          filter-placeholder="请输入关键字"
          v-model="keys"
          @on-change="onChange($event, data)"
          :data="data">
      </el-transfer>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="onSubmit(row)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import { getUserList, updatePermission } from '@/api/uums';
@Component
export default class AdePowerUser extends Vue {
  keys = [];
  loading = false;
  data: any = [];
  num = 0;

  get visible() {
    return ModalEditorModule.modalShow;
  }

  get row() {
    return ModalEditorModule.modalData;
  }

  @Watch('row')
  watchRow(row: any) {
    this.keys = row.users;
    if (this.num > 0) { return; }
    this.num++;
    this.getUserList();
  }

  async getUserList() {
    try {
      const list: any = await getUserList();
      for (const k of list) {
        k.key = k.id;
        k.label = k.name;
      }
      this.data = list;
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit(row: any) {
    this.loading = true;
    const parms = {
      id: row.id,
      users: this.keys,
    };
    try {
      await updatePermission(parms);
      this.loading = false;
      this.$emit('upup'); // 外抛
      this.handleClose();
    } catch (err) {
      this.loading = false;
      console.error(err);
    }
  }

  handleClose() {
    ModalEditorModule.modalClose();
  }
}
</script>

