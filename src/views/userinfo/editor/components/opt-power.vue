<template>
<div class="opt-power">
<el-checkbox v-model="params.read">列表</el-checkbox>
<el-checkbox v-model="params.create">新增</el-checkbox>
<el-checkbox v-model="params.update">修改</el-checkbox>
<el-checkbox v-model="params.delete">删除</el-checkbox>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class OptPower extends Vue {
  @Prop({ default: {} }) params!: any;
}
</script>
<style lang="scss" scoped>
.opt-power {
  border: 1px solid #dcdfe6;
  padding-left: 10px;
  border-radius: 4px;
}
</style>
