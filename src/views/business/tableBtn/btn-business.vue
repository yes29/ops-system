<template>
<div class="btn-business"  @click="stopProp($event)">
  <el-button type="text" size="small" icon="icon iconfont icon-rmon-collect" @click="handleRmon(row)">监控</el-button>
  <!-- 不能删，处理button间距 -->
  <i></i>
  <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
  <popover-delete :row="row" @onDelete="reqDelete"></popover-delete>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import PopoverDelete from '@/components/baseTable/components/popover-delete.vue';
@Component({components: {PopoverDelete}})
export default class BtnBusiness extends Vue {
  @Prop({default: {}}) row!: any;
  @Prop() reqDelete!: any;
  @Prop() handleEdit!: any;

  // 阻止冒泡
  stopProp(e: any) {
    e.stopPropagation();
  }

  // 操作监控
  handleRmon(row:　any) {
    const query: any = {
      id: row.id,
      service: encodeURIComponent(row.service),
    };
    this.$router.push({name: 'm_business', query});
  }
}
</script>

