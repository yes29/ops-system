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
import { getProjectService} from '@/api/service';
import { getQuery } from '@/utils/index';
import TdSelect from '@/components/select/td-select.vue';
import TdTransfer from './transfer.vue';
import { setNames } from '@/components/transfer/transfer.ts';
@Component({components: {TdTransfer, TdSelect}})
export default class OptTransfer extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: {} }) item!: any;
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

  // 获取服务信息
  getDataList() {
    if (this.num > 0) {
      return;
    }
    this.num ++;
    const params = {
      page: 1,
      size: 1000,
      filter:  {
        project_team_id: getQuery('project_team_id'),
      },
    };
    getProjectService(params).then((list: any) => {
      let arr: any = [];
      for (const k of list) {
        arr.push({id: k.id, name: k.name});
      }
      arr = [{id: 0, name: '关联服务', children: arr}];
      this.setCList(arr);
    });
  }

  // 设置选中的names
  setCList(list: any) {
    const keys: any = this.params[this.item.key];
    this.names = setNames(keys, list);
    this.columns = list;
  }
}
</script>
