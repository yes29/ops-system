<template>
  <sample-editor
      title="MQ实例"
      @upup="$emit('upup')"
      proxy="db_service"
      service="mq"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpMQ extends Vue {
  columns: any = [
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'mq_service_id'},
    ],
  ];
}
</script>
