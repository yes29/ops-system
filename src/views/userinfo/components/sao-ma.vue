<template>
<iframe
    id="sao-ma"
    class="mt15"
    src="https://login.dingtalk.com/login/qrcode.htm?goto=https%3a%2f%2foapi.dingtalk.com%2fconnect%2foauth2%2fsns_authorize%3fappid%3ddingoa1w7sfr3odsbphvzi%26response_type%3dcode%26scope%3dsnsapi_login%26state%3dSTATE%26redirect_uri%3dhttps%3a%2f%2fauth.tuandai888.com"
    frameborder="0"
    scrolling="no"
    width="100%"
    height="294px">
</iframe>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { saoMaLogin } from '@/api/uums';
import { Message } from 'element-ui';
import { setTimeout } from 'timers';
import { setObjLocal } from '@/utils/index';
import { setMenu } from '@/utils/index';
// import menu from './menu';
@Component
export default class SaoMa extends Vue {
    mounted() {
        if (typeof window.addEventListener) {
            window.addEventListener('message', this.hanndleMessage, false);
        }
    }
    hanndleMessage(event: any) {
        const origin = event.origin;
        if (origin === 'https://login.dingtalk.com') { // 判断是否来自ddLogin扫码事件。
            const loginTmpCode = event.data; // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
            saoMaLogin(loginTmpCode).then((rest: any) => {
                rest.menu = setMenu(rest.menu);
                // rest.menu = menu;
                setObjLocal('cmdb_userinfo', rest);
                location.href = './dashboard';
            })
            .catch((err: any) => {
                Message({
                    message: '登录失败，请重新扫码！',
                    type: 'error',
                });
                setTimeout (() => {
                   location.href = './';
                }, 5000);
            });
        }
    }
}
</script>

