<template>
 <td-detail title="用户详情">
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
export default class DUserProfile extends Vue {
  baseOptList = [
    {title: '账号', key: 'job_id'},
    {title: '用户名', key: 'name'},
    {title: '电话', key: 'phone'},
    {title: '邮箱', key: 'email'},
    {title: '状态', key: 'is_active_human'},
    {title: '上次登录', key: 'login_time'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
