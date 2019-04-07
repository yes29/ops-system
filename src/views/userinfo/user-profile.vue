<template>
  <td-table
      :columns="columns"
      opt-width="280"
      proxy="uums/user"
      service="user">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-user-profile.vue';
@Component({components: {TdTable, TdDetail}})
export default class UserProfile extends Vue {
  columns = [
    {title: '账号', key: 'job_id'},
    {title: '用户名', key: 'name'},
    {title: '职位', key: 'position'},
    {title: '状态', key: 'is_active_human'},
    {title: '上次登录', key: 'login_time'},
  ];
}
</script>
