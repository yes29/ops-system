<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
import { getProjectTeamList } from '@/api/uums';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor, OptTransfer}})
export default class AdeJava extends Vue {
  languageList = ['java', 'c#', '.net'];
  columns = [
    [
      {type: 'input', label: '应用名', key: 'name', required: true},
      {type: 'input', label: '简称', key: 'short_name', required: true},
    ],
    [
      {type: 'input', label: '负责人', key: 'manager', required: true},
      {type: 'input', label: '运行环境', key: 'env_arg', required: true},
    ],
    [
      {
        type: 'render',
        label: '关联proxy',
        key: 'agent_ids',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: 'proxy_',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
      {
        type: 'render',
        label: '关联db',
        key: 'db_ids',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: 'db_',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {type: 'selStr', label: '语言', key: 'development_language', optList: this.languageList},
      {type: 'select', label: '项目组', key: 'project_team_id', optList: []},
    ],
    [
      {type: 'input', label: '部署路径', key: 'dpy_path'},
      {type: 'input', label: '启动参数', key: 'run_arg'},
    ],
    [
      {type: 'input', label: '服务描述', key: 'describe'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];
  mounted() {
    this.getSelect();
  }
  getSelect() {
    getProjectTeamList().then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'project_team_id');
    });
  }
}
</script>
