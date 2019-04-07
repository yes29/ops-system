<template>
<el-card class="box-card">
  <excel-dialog
      ref="dialog"
      :excelList="excelList"
      :columns="columns">
  </excel-dialog>
  <div slot="header" class="clearfix">
    <span class="fbw">{{title}}</span>
    <el-button class="prv c-link" type="text" @click="handleBack" icon="el-icon-back"></el-button>
  </div>
  <div class="import-step">
    <h1 class="title">
      <span class="num">①</span>
      <span class="text">准备任务</span>
    </h1>
    <p>
      所有允许导入的任务字段请参考模版
      <span class="fbw">部分不可导入的数据请编辑，失败数据会保留；</span>
    </p>
    <p class="import-rules" id="import-rules-add">
        1）下拉选择的值，请参照模块填写；
        <br>
        2）日期型字段格式为：YYYY-MM-DD；
        <br>
        3）标题头的值，请确保与模板的值保持一致。
        <br>
    <p @click="handleExport">
      <a class="c-link cp">下载导入模板</a> 
    </p>
  </div>
  <div class="import-step mt20">
    <h1 class="title">
      <span class="num">②</span>
      <span class="text">上传数据文件</span>
    </h1>
    <p>目前支持的文件类型为*.xls，*.xlsx。</p>
    <td-upload @onSuccess="onSuccess"></td-upload>
  </div>
</el-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { getObjLocal } from '@/utils/index';
import { writeFile, utils } from 'xlsx';
import TdUpload from './upload.vue';
import ExcelDialog from './dialog.vue';
@Component({components: {TdUpload, ExcelDialog}})
export default class Excel extends Vue {
  columns: any = [];
  excelList: any = [];
  title: any = '';

  mounted() {
    this.getQuery();
  }

  getQuery() {
    const query: any = this.$route.query;
    this.title = query.title;
    const columns = decodeURIComponent(query.columns);
    this.columns = getObjLocal('td_excel_editor_columns');
  }

  @Watch('$route.query.title')
  handleTitle() {
    this.getQuery();
  }

  handleExport() {
    const obj: any = {};
    for (const row of this.columns) {
      for (const col of row) {
        if (col.type === 'date' || col.type === 'input' || col.type === 'textarea' || col.type === 'number') {
          obj[col.label] = '';
        }
        if ((col.type === 'select' || col.type === 'selStr') && col.optList.length > 0 && !col.showKey) {
          obj[col.label] = '';
          const arr: string[] = [];
          for (const k of col.optList) {
            const opt: any = {};
            if (k.id === 0 || k.id) {
              opt[col.label] = k.name;
            } else {
              opt[col.label] = k;
            }
            arr.push(opt);
          }
          this.writeFile(arr, col.label + '_值参考.xlsx');
        }
      }
    }
    const name = this.title.substring(2, this.title.length) + '导入模板.xlsx';
    this.writeFile([obj], name);
  }

  writeFile(columns: string[], name: string) {
    const ws = utils.json_to_sheet(columns);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'sheet');
    writeFile(wb, name);
  }

  // 返回上一面
  handleBack() {
    window.history.go(-1);
  }

  onSuccess(data: any) {
    const refs: any = this.$refs;
    refs.dialog.show = true;
    this.excelList = Object.assign({}, data);
  }

}
</script>
<style lang="scss" scoped>
.box-card{
  padding: 10px 20px 30px;
  background: #fff;
  width: 980px;
  margin: 0 auto;
  min-height: calc(100vh - 130px) !important;
  .import-step {
    padding-left: 20px;
    p {
      line-height: 27px;
      margin-left: 28px;
      color: #888;
    }
  }
  .prv{
      float: right;
      font-size: 20px;
      padding: 3px 0 !important;
    }
  .title {
    margin-bottom: 8px;
    .num {
      font-size: 18px;
      font-weight: 100;
    }
    .text {
      font-size: 14px;
      margin-left: 8px;
      font-weight: 100;
    }
  }
}
</style>

