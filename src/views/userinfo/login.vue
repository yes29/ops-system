<template>
<div class="login" :class="showAccount? '': 'mb20'">
  <div v-if="showAccount">
    <div class="title">账号登录</div>
    <div class="switch" @click="cliToggle">
      <div class="triangle"></div>
      <svg-icon class="svg" name="saoma"/>
    </div>
    <login-form></login-form>
  </div>
  <div v-else>
    <div class="title">扫码登录</div>
    <div class="switch" @click="cliToggle">
      <div class="triangle"></div>
      <svg-icon class="svg" name="account"/>
    </div>
    <sao-mo></sao-mo>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { removeLocal } from '@/utils/index';
import SaoMo from './components/sao-ma.vue';
import LoginForm from './components/login-form.vue';
@Component({components: {SaoMo, LoginForm}})
export default class Login extends Vue {
  showAccount = false;
  mounted() {
    window.localStorage.clear();
  }
  cliToggle() {
    if (this.showAccount) {
      this.showAccount = false;
    } else {
      this.showAccount = true;
    }
  }
}
</script>
<style lang="scss">
.login{
  position: relative;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  background-clip: padding-box;
  width: 420px;
  padding: 30px;
  // background: #242730;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  .title{
    font-size: 18px;
    color: #000;
    // color: #ffd005;
  }
  .el-input__inner{
    height: 42px;
  }
  // .el-input--prefix .el-input__inner{
  //   background: rgba(0, 0, 0, 0.4);
  // }
  .switch{
    top: 5px;
    right: 56px;
    position: absolute;
    cursor: pointer;
    .svg {
      font-size:52px;
      position: absolute;
      z-index: 1;
    }
    .triangle{
      z-index: 2;
      width: 0;
      height: 0;
      position: absolute;
      border-color:  #fff transparent;
      border-width: 0 52px 52px 0;
      border-style: solid;
    }
  }
  .icon-username{
    font-size: 18px;
    color: #777;
  }
  .icon-password{
    font-size: 18px;
    color: #777;
  }
  .el-button{
    width: 100%;
    margin-top: 30px;
  }
}
</style>

