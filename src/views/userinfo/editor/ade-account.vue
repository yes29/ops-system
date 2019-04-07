<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdeAccount extends Vue {
  relevanceList = ['物理机', '服务器'];
  statusList  = ['开启', '失效'];
  accountTypeList  = ['远程管理', '操作系统', '服务'];
  columns = [
    [
      {type: 'input', label: '用户名', key: 'user_name', required: true},
      {type: 'input', label: '密码', key: 'password', required: true},
    ],
    [
      {type: 'input', label: '标签', key: 'label', required: true},
      {type: 'date', label: '过期日期', key: 'expiry_time', required: true},
    ],
    [
      {type: 'select', label: '用户状态', key: 'user_status', optList: this.statusList},
      {type: 'select', label: '用户类型', key: 'account_type', optList: this.accountTypeList},
    ],
    [
      {type: 'select', label: '主机', key: 'noValue', optList: this.relevanceList},
    ],
    [
      {type: 'select', label: '物理机', key: 'pmserver_id', optList: [], showKey: 'noValue', showValue: 0},
    ],
    [
      {type: 'select', label: '服务器', key: 'server_id', optList: [], showKey: 'noValue', showValue: 1},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  getSelect() {
    getSelectList('pmserver').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'pmserver_id');
    });
    getSelectList('server').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'server_id');
    });
  }
}
</script>
