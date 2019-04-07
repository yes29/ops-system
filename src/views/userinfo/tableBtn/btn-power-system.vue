<template>
<div  @click="stopProp($event)">
  <el-button type="text" size="small" icon="el-icon-share" @click="handleUser(row)">关联用户</el-button>
  <i></i>
  <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(row)">设置权限</el-button>
  <popover-delete :row="row" @onDelete="reqDelete"></popover-delete>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import PopoverDelete from '@/components/baseTable/components/popover-delete.vue';
@Component({components: {PopoverDelete}})
export default class BtnPowerSystem extends Vue {
  @Prop({default: {}}) row!: any;
  @Prop() reqDelete!: any;
  @Prop() handleEdit!: any;

  stopProp(e: any) {
    e.stopPropagation();
  }

  handleUser(row: any) {
    ModalEditorModule.modalView(row);
  }
}
</script>
