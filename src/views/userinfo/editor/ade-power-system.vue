<template>
 <td-editor :columns="columns"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import OptTransfer from '@/components/transfer/service-transfer.vue';
import MenuPower from './components/menu-power.vue';
import OptPower from './components/opt-power.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor, OptTransfer, MenuPower, OptPower}})
export default class AdePowerSystem extends Vue {
  columns = [
    [
      {type: 'input', label: '角色名称', key: 'name', required: true},
    ],
    [
      {
        type: 'render',
        label: '关联项目组',
        key: 'project_teams',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: '/uums/user/list/project_team/?page=1&size=1000',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [
      {
        type: 'render',
        label: '关联用户',
        key: 'users',
        value: [],
        render: (h: any, data: any) => {
          return h(OptTransfer, {
            props: {
              api: '/uums/user/list/user/?page=1&size=1000',
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
    [ // 因为权限设置有4个值，要设置4个key
      {
        type: 'render',
        label: '功能设置',
        key: 'read',
        render: (h: any, data: any) => {
          return h(OptPower, {
            props: {
              params: data.params,
              item: data.item,
            },
          });
        },
      },
      {key: 'create'},
      {key: 'update'},
      {key: 'delete'},
    ],
    [
      {
        type: 'render',
        label: '菜单设置',
        key: 'menu',
        render: (h: any, data: any) => {
          return h(MenuPower, {
            props: {
              params: data.params,
              item: data.item,
            },
          });
        },
      },
    ],
  ];

  mounted() {
    this.getSelect();
  }

  getSelect() {
    getSelectList('datacenter').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'data_center_id');
    });
    getSelectList('company').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'company_id');
    });
  }

}
</script>
