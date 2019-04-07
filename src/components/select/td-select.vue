<template>
<div class="el-select">
  <div class="el-input el-input--suffix">
    <input type="text"
        class="el-input__inner"
        ref="input"
        readonly="readonly"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder">
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
      </span>
    </span>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class TdSelect  extends Vue {
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) placeholder!: string;
}
</script>
