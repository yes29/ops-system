<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
@Component({components: {TdEditor}})
export default class AdeUserProfile extends Vue {
  userStatusList = ['未激活', '激活'];
  columns = [
    [
      {type: 'input', label: '钉钉工号', key: 'job_id', required: true},
    ],
    [
      {type: 'input', label: '用户名', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '联系电话', key: 'phone'},
    ],
    [
      {type: 'input', label: '联系邮箱', key: 'email'},
    ],
    [
      {type: 'select', label: '用户状态', key: 'is_active', optList: this.userStatusList},
    ],
    [
      {type: 'input', label: 'secret', key: 'secret'},
    ],
    [
      {type: 'datetime', label: '过期时间', key: 'expiry_time'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
}
</script>
