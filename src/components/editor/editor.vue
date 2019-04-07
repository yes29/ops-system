<template>
<el-card class="box-card editor" v-loading="loading">
  <div slot="header" class="clearfix">
    <span class="fbw">{{$route.meta.title}}</span>
    <el-button class="prv c-link" type="text" @click="handleBack" icon="el-icon-back"></el-button>
  </div>
  <el-form 
    class="mt20"
    ref="params"
    :model="params"
    :label-width="labelWidth">
  <slot v-for="row in columns">
    <el-row :gutter="20" v-if="row.length === 2">
      <el-col :span="12" v-for="(item, index) in row" :key="index">
        <form-item :item="item" :params="params"></form-item>
      </el-col>
    </el-row> 
    <form-item v-else :item="row[0]" :params="params"></form-item>
  </slot>
  <div class="tar c-link cp" v-if="isExport" @click="handleBatch">批量导入</div>
  <el-form-item class="mt30">
    <el-button type="primary" class="ed-btn" :loading="btnLoading" @click="onSubmit(params)">保存</el-button>
    <el-button @click="handleReset" class="ed-btn">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { getObjLocal, removeLocal, setObjLocal } from '@/utils/index';
import { TagsViewModule } from '@/store/modules/tagsView';
import { AppModule } from '@/store/modules/app';
import { post } from '@/api/common';
import FormItem from './form-item.vue';
import { throws } from 'assert';
import { setTimeout } from 'timers';
@Component({components: {FormItem}})
export default class Editor extends Vue {
  @Prop({ default: [] }) columns!: any;
  @Prop({ default: null }) filter!: any;
  @Prop({ default: true }) !isExport: any;
  @Prop({ default: '90px' }) labelWidth!: string;
  title = '';
  params: any = {};
  query: any = {};
  btnLoading = false;

  // 获取共用loading
  get loading() {
    return AppModule.loading;
  }

  // 获取投部传过来的参数
  mounted() {
    this.getQuery();
  }

  // 如果row出现变化时，及时更新
  @Watch('$route.query.row')
  getQuery() {
    const query: any = this.$route.query;
    this.query = {
      type:　query.type,
      api: query.api,
    };
    if (query.edit) {
      this.params = getObjLocal(query.api);
    }
  }

  // 进入批量新增
  handleBatch() {
    const query: any = {
      api:  this.query.api,
      title:  this.$route.meta.title,
      editorRouter: this.$route.name,
    };
    setObjLocal('td_excel_editor_columns', this.columns);
    this.$router.push({path: '/excel-editor', query});
  }

  // 提交， 处理提交参数
  onSubmit(params: any) {
    const refs: any = this.$refs.params;
    refs.validate((valid: boolean) => {
      if (valid) {
        let data: any = {};
        for (const k of this.columns) {
          for (const n of k) {
            // 非null不传给后台，key 为noValue不传给后台、当params[n.key]为0时，if读取到为false，加判断
            if (n.key !== 'noValue') {
              data[n.key] = params[n.key] ? params[n.key] : n.value ? n.value : null;
            }
            if (params[n.key] === 0) { // 为0时上面过虑掉了, 要重新赋值
              data[n.key] = params[n.key];
            }
          }
        }
        if (params.id) {
          data.id = params.id;
        }
        if (this.filter) {
          data = Object.assign(data, this.filter);
        }
        this.post(data);
      }
    });
  }

  // 提交数据接口
  async post(data: any) {
    this.btnLoading = true;
    try {
      await post(this.query.api, data);
      this.btnLoading = false;
      if (data.id) {
        this.$message({type: 'success', message: '数据修改成功！'});
        TagsViewModule.delVisitedView(this.$route);
        removeLocal(this.query.api);
        this.handleBack();
      } else {
        this.addSuccess();
      }
    } catch (err) {
      this.btnLoading = false;
      console.error(err);
    }
  }

  // 数据编辑成功处理
  addSuccess() {
    this.$confirm('数据保存成功, 是否继续?', '提示', {
      confirmButtonText: '继续',
      cancelButtonText: '返回',
      type: 'success',
    }).then(() => {
      this.handleReset();
    }).catch(() => {
      this.handleBack();
    });
  }

  // 返回上一面
  handleBack() {
    removeLocal(this.query.api);
    window.history.go(-1);
  }

  // 重置表单
  handleReset() {
    this.params = {};
    const refs: any = this.$refs.params;
    refs.resetFields();
  }

}
</script>
<style lang="scss">
  .editor{
    padding: 10px 20px 30px;
    background: #fff;
    width: 936px;
    margin: 0 auto;
    min-height: calc(100vh - 130px) !important;
    .el-cascader{
      width: 100%;
    }
    .prv{
      float: right;
      font-size: 20px;
      padding: 3px 0 !important;
    }
    // .el-form-item__label{
    //   color: #999;
    // }
    .el-card__body{
      padding: 12px 30px 10px 10px;
    }
    .el-card__header {
      padding: 15px 5px;
    }
    .el-input--medium .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
    .ed-btn {
      padding: 12px 28px;
    }
    .ed-btn+.el-button {
      margin-left: 20px;
    }
  }
</style>