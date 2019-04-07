<template>
  <el-dialog
    width="580px"
    class="attr-transfer"
    title="共享到项目组"
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
import { Message } from 'element-ui';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import { getProjectTeamList } from '@/api/uums';
import {serviceShareToProject} from '@/api/service';
@Component
export default class AdeShareService extends Vue {
  keys = [];
  loading = false;
  data: any = [];
  num = 0;
  oldProjectTeamId = 0;

  get visible() {
    return ModalEditorModule.modalShow;
  }

  get row() {
    return ModalEditorModule.modalData;
  }

  @Watch('row')
  watchRow(row: any) {
    this.keys = row.project_ids;
    if (this.num > 0 && this.oldProjectTeamId === row.project_team_id) { return; }
    this.num++;
    this.oldProjectTeamId = row.project_team_id;
    this.getProjectTeamList(row.project_team_id);
  }

  async getProjectTeamList(id: any) {
    try {
      const list: any = await getProjectTeamList();
      const arr: any = [];
      for (const k of list) {
        if (id !== k.id) {
          k.key = k.id;
          k.label = k.name;
          arr.push(k);
        }

      }
      this.data = arr;
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit(row: any) {
    this.loading = true;
    const parms = {
      service_id: row.id,
      project_ids: this.keys,
    };
    try {
      const result: any = await serviceShareToProject(parms);
      if (result[0].code === 0) {
         Message({message: '操作成功.', type: 'success'});
      }
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

