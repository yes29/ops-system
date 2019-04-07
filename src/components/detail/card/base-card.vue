<template>
<el-card class="box-card" :style="{height: height}">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <slot></slot>
  </div>
  <!-- v-if="row[item.key]" -->
  <p class="base"
      :class="item.className"
      :style="{width: width}"
      v-if="row[item.key] || showNull"
      v-for="(item, index) in optList"
      :key="index">
    <span class="c-888">{{item.title}}：</span>
      <router-link
          class="c-link"
          v-if="item.path && row[item.key]"
          :to="{
            path: item.path,
            query:{
              keyword: row[item.key],
              openDetail: true
            }
          }">
          {{row[item.key]}}
        </router-link>
      <!-- 针对物事机 - 详情 - 距离保修到期 -->
      <span v-else-if="item.key === 'remain_days' && row.remain_days" :class="row.remain_days < 183 ? 'c-ed4': ''"> {{row.remain_days}}天 </span>
      <span v-else-if="row[item.key]">
        {{row[item.key]}}
        <span v-if="item.unit">{{item.unit}}</span>
      </span>
      <span v-else>--</span>
  </p>
  <slot name="content"></slot>
  <div class="clear"></div>
  <p class="base" v-if="row.remark">
    <span class="c-888">备注：</span>{{row.remark}}
  </p>
  <p class="clear"></p>
</el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class BaseCard extends Vue {
  @Prop({default: '基本信息'}) title!: string;
  @Prop() height!: string;
  @Prop({default: {}}) row!: object;
  @Prop({default: '100%'}) width!: string;
  @Prop({default: []}) optList!: string[];
  @Prop({default: true}) showNull!: boolean;
}
</script>
