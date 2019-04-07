<template>
<div class="opt-db">
  <td-select 
      v-model="names"
      :title="item.label"
      :placeholder="'请选择' + item.label"
      @click.native="$refs.transfer.show = true">
  </td-select>
  <td-transfer
      ref="transfer"
      :columns="columns"
      v-model="params[item.key]"
      @getNames ="setCList">
  </td-transfer>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {getTransferList} from '@/api/common';
import TdSelect from '@/components/select/td-select.vue';
import TdTransfer from './transfer.vue';
import { setNames } from '@/components/transfer/transfer.ts';
@Component({components: {TdTransfer, TdSelect}})
export default class ServiceTransfer extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: {} }) item!: any;
  @Prop({ default: '' }) api!: string;
  columns = [];
  names = '';
  num = 0;

  mounted() {
    this.getDataList();
  }

  // 监听params， 请求数据
  @Watch('params')
  getServiceList() {
    this.getDataList();
  }

  // 获取服务接口
  getDataList() {
    if (this.num > 0) {
      return;
    }
    this.num ++;
    let api = this.api;
    if (api.length < 10) { // 默认来自服务资源
      // api为service/all/list/、service_service/all/list/、proxy_service/all/list/
      api = '/service/' + this.api + 'service/all/list/';
    }
    getTransferList(api, {}).then((list: any) => {
      if (list.length === 0) {
        list = [{id: 0, name: this.item.label, children: list}];
      }
      // 用户设置--> 权限管理 --> 关联用户数据特殊处理
      if (this.item.key === 'users') {
        list = [{id: 0, name: '关联用户', children: list}];
      }
      // 用户设置--> 权限管理 --> 项目组数据特殊处理
      if (this.item.key === 'project_teams') {
        list = [{id: 0, name: '关联项目组', children: list}];
      }
      this.setCList(list);
    });
  }

  // 设置选中的list
  setCList(list: any) {
    const keys: any = this.params[this.item.key];
    this.names = setNames(keys, list);
    this.columns = list;
  }
}
</script>
