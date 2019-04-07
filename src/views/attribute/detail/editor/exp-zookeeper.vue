<template>
  <sample-editor
      title="Zookeeper实例"
      @upup="$emit('upup')"
      proxy="proxy_service"
      service="zookeeper"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpZookeeper extends Vue {
  columns: any = [
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'zookeeper_id'},
    ],
  ];
}
</script>


