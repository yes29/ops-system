<template>
<el-card class="box-card mt20 w_100" :style="{height: height}">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
  </div>
  <slot></slot>
</el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class TdCard extends Vue {
  @Prop({default: '信息'}) title!: string;
  @Prop() height!: string;
}
</script>
