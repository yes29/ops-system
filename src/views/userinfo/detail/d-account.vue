<template>
 <td-detail title="账号详情">
    <base-card
      height="calc(100vh - 100px)"
      :row="row"
      :optList="baseOptList">
    </base-card>
 </td-detail>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
@Component({components: {TdDetail, BaseCard}})
export default class DAccount extends Vue {
  baseOptList = [
    {title: '用户名', key: 'user_name'},
    {title: '密码', key: 'password'},
    {title: '物理机', key: 'pmserver_name'},
    {title: '服务器', key: 'server_name'},
    {title: '标签', key: 'label'},
    {title: '类型', key: 'account_type_detail'},
    {title: '状态', key: 'user_status_detail'},
    {title: '备注', key: 'remark'},
    {title: '过期日期', key: 'expiry_time', class: 'mt30'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
