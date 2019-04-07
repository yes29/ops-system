<template>
 <td-detail title="权限详情">
    <base-card
      :row="row"
      :optList="baseOptList">
    </base-card>
    <table-card
        title="用户信息"
        :columns ="row.user_list?row.user_list:[]"
        :optList="userList">
    </table-card>
 </td-detail>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
@Component({components: {TdDetail, BaseCard, TableCard}})
export default class DPowerSystem extends Vue {
  baseOptList = [
    {title: '名称', key: 'name'},
    {title: '项目组', key: 'project_team_name'},
  ];
  userList = [
    {title: '账号', key: 'job_id'},
    {title: '用户名', key: 'name'},
    {title: '电话', key: 'phone'},
    {title: '状态', key: 'is_active_human', align: 'center'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
