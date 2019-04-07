<template>
<el-select 
    v-model="urlIds"
    @change="change"
    clearable
    filterable
    multiple
    no-data-text="如果没有关联服务，请先关联服务，若关联了服务，说明该服务下没有可选URL地址！"
    placeholder="请选择需重点关注的URL">
  <el-option
      v-for="item in urlSelectList"
      :key="item.id"
      :label="item.service_name + '：' + item.uri"
      :value="item.id">
  </el-option>
</el-select>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { getServiceUrl } from '@/api/service';
import { setTimeout } from 'timers';

@Component
export default class UriInfo extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: {} }) item!: any;
  urlSelectList: any = [];
  urlIds: any = [];

  async setUrlIds() {
    const params = this.params;
    const arr: any = [];
    if (params.uri_info) {
      for (const row of params.uri_info) {
        for (const col of row.uris) {
          arr.push(col.id);
        }
      }
    }
    this.urlIds = arr;
  }

  // 监听params， 请求数据
  @Watch('params.service_ids')
  getUriList(ids: any) {
    if (!ids) { return; }
    this.getDataList(ids);
  }

  change() {
    const params = this.params;
    // 提取选中的数据
    const items: any  = [];
    for (const item of this.urlSelectList) {
      for (const key of this.urlIds) {
        if (key === item.id) {
          items.push(item);
        }
      }
    }
    // 拼接uri_info
    const uriInfo: any = [];
    for (const item  of items) {
      if (uriInfo.length > 0) { // 已经存在，检查uriInfo中是否已经有服务
        let equality: any = false;
        for (const k of uriInfo) {
          if (k.service_id === item.service_id) { // 已经有服务，push item中的id
            k.uri_ids.push(item.id);
            equality = true;
          }
        }
        if (!equality) { // 不存在服务，添加一条新数据
          uriInfo.push({
            service_id: item.service_id,
            service_name: item.service_name,
            uri_ids: [item.id],
          });
        }
      } else { // 当uriInfo， push item第一条数据
        uriInfo.push({
          service_id: item.service_id,
          service_name: item.service_name,
          uri_ids: [item.id],
        });
      }
    }
    params.uri_info = JSON.stringify(uriInfo);
  }

  // 获取uri列表数据
  async getDataList(ids: any) {
    const list: any = await getServiceUrl({ids});
    const arr: any = [];
    for (const k of list) {
      if (k.data && k.data.length > 0) {
        for (const m of k.data) {
          arr.push(m);
        }
      }
    }
    this.urlSelectList = arr;
    this.setUrlIds(); // 主要用于编辑
    this.change(); // 主要用于编辑
  }
}
</script>
