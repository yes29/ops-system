<template>
<el-form class="mt25" :model="params" ref="params">
  <el-form-item
      class="mt15"
      prop="username"
      :rules="required('请输入用户名')">
    <el-input placeholder="请输入用户名" v-model="params.username">
      <i slot="prefix" class="icon iconfont icon-username"></i>
    </el-input>
  </el-form-item>
  <el-form-item 
      prop="password"
      :rules="required('请输入密码')"
      class="mt25">
    <el-input
        type="password"
        placeholder="请输入密码"
        v-model="params.password">
      <i slot="prefix" class="icon iconfont icon-password"></i>
    </el-input>
  </el-form-item>
  <el-button type="primary" :loading="loading" @click="handleLogin(params)">立即登录</el-button>
</el-form>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { autoLogin, confirmLogin } from '@/api/uums';
import { required } from '@/utils/validate';
import { Form as ElForm } from 'element-ui';
import { setObjLocal } from '@/utils/index';
import { setMenu } from '@/utils/index';
import { AppModule } from '@/store/modules/app';
@Component
export default class FormSbumit extends Vue {
  // 成员验证
  required = required;
  // 成员参数
  params = {
    username: '',
    password: '',
  };

  get loading() {
    return AppModule.loading;
  }

  handleLogin() {
    (this.$refs.params as ElForm).validate((valid: boolean) => {
      if (valid) {
        autoLogin(this.params).then((rest) => {
          this.handleCode(rest);
        });
      }
    });
  }

  handleCode(rest: any) {
    this.$prompt('请输入二次验证码', '二次验证', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[0-9]*[1-9][0-9]*$/,
      inputErrorMessage: '验证码格式不正确',
    }).then(({ value }) => {
      rest.code = value;
      this.submitCode(rest);
    });
  }

  async submitCode(rest: any) {
    const params = {
      authCode: rest.code,
      username: rest.username,
      authToken: rest.token,
    };
    const data: any = await confirmLogin(params);
    data.menu = setMenu(data.menu);
    setObjLocal('cmdb_userinfo', data);
    location.href = './dashboard';
  }
}
</script>
