<template>
  <modal-editor
      :label-width="labelWidth"
      :title="title"
      @upup="$emit('upup')"
      :api="api"
      :columns="columns">
  </modal-editor>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import { DetailModule } from '@/store/modules/detail';
import ModalEditor from '@/components/editor/modal-editor.vue';
import SampleSelect from './sample-select.vue';
import { rscListServerBrief } from '@/api/cmdb';
@Component({components: {ModalEditor}})
export default class SampleEditor extends Vue {
  @Prop({ default: [] }) columns!: any;
  @Prop({ default: '' }) proxy!: string;
  @Prop({ default: '' }) service!: string;
  @Prop({ default: '编辑' }) title!: string;
  @Prop({ default: '66px' }) labelWidth!: string;
  api: any = '';
  num = 0;
  publicColumns = [
    [{type: 'input', label: '主机名', key: 'hostname', required: true}],
    [{type: 'input', label: 'ip', key: 'ip', required: true}],
    [{type: 'input', label: '端口', key: 'port', required: true}],
    [
      {key: 'server_id'},
      {key: 'data_center'},
      {key: 'data_center_id'},
      {key: 'minion_name'},
    ],
  ];

  get modalData() {
    return ModalEditorModule.modalData;
  }

  @Watch('modalData')
  WatchModalData() {
    this.handleData();
  }

  mounted() {
    this.handleData();
  }

  handleData() {
    let opt = 'create';
    if (this.modalData.id) {
      opt = 'update';
    }
    this.api = 'service/' + this.proxy +　'/' + opt +  '/' + this.service +  '/instance/';
    if (this.num > 0) { return; }
    this.num ++;
    this.columns.unshift(...this.publicColumns);
    this.getServerList();
  }

  async getServerList() {
    const briefList: any = await rscListServerBrief();
    for (const k of briefList) {
      k.hostname = k.name;
    }
    this.columns[0] = [{
      type: 'render',
      label: '主机名',
      key: 'hostname',
      required: true,
      render: (h: any, data: any) => {
        return h(SampleSelect, {
          props: {
            params: data.params,
            briefList,
            item: data.item,
          },
        });
      },
    }];
    this.columns[1] = [{
      type: 'render',
      label: 'ip',
      key: 'ip',
      required: true,
      render: (h: any, data: any) => {
        return h(SampleSelect, {
          props: {
            params: data.params,
            briefList,
            item: data.item,
          },
        });
      },
    }];
  }
}
</script>


