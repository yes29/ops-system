<template>
  <td-table 
      :columns="columns"
      proxy="cmdb/rsc"
      service="account">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-account.vue';
@Component({components: {TdTable, TdDetail}})
export default class Account extends Vue {
  columns = [
    {title: '用户名', key: 'user_name'},
    {title: '密码', key: 'password'},
    {title: '物理机', key: 'pmserver_name'},
    {title: '服务器', key: 'server_name'},
    {title: '标签', key: 'label'},
    {title: '过期日期', key: 'expiry_time'},
    {title: '类型', key: 'account_type_detail'},
    {title: '状态', key: 'user_status_detail'},
  ];
}
</script>
