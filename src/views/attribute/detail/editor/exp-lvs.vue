<template>
  <sample-editor
      title="lvs实例"
      idKey="lvs_id"
      @upup="$emit('upup')"
      proxy="proxy_service"
      service="lvs"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpLvs extends Vue {
  columns: any = [
    [
      {type: 'input', label: '权重', key: 'weight'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'lvs_id'},
    ],
  ];
}
</script>
