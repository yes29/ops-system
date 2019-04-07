<template>
<div class="btn-business"  @click="stopProp($event)">
  <el-button type="text" size="small" icon="el-icon-share" @click="handleShareService(row)">共享服务</el-button>
  <el-button type="text" size="small" icon="icon iconfont icon-rmon-collect" @click="handleRmon(row)">监控</el-button>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
@Component
export default class BtnBusiness extends Vue {
  @Prop({default: {}}) row!: any;

  // 阻止冒泡
  stopProp(e: any) {
    e.stopPropagation();
  }

  // 进入监控
  handleRmon(row:　any) {
    const query: any = {
      id: row.id,
      service_name: row.name,
    };
    this.$router.push({name: 'm_service', query});
  }

  // 打开共享服务
  handleShareService(row: any) {
    ModalEditorModule.modalView(row);
  }
}
</script>
