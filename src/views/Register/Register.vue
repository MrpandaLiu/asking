<template>
  <div class="register">
    <nav-bar title="注册账户"></nav-bar>
    <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="username"
            label="邮箱"
            placeholder="请输入用户邮箱，作为您的唯一标识"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
            v-model="nickname"
            name="nickname"
            label="昵称"
            placeholder="请输入昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="confirmPwd"
            type="password"
            name="confirmPwd"
            label="确认密码"
            placeholder="请再输入一次密码"
            :rules="pwdRules"
        />
        <div style="margin: 20px;">
            <van-button round block type="info" native-type="submit">
            提交
            </van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
// 引入方法
import {UseComponents} from '../../utils';
import {sendRegisterMsg} from '../../network/user';
// 引入组件
import NavBar from '../../components/NavBar';
import {Form,Button,Field,Notify} from 'vant';
import Vue from 'vue';
UseComponents(Vue,Form,Button,Field,Notify);

export default {
    name: 'Register',
    data() {
        this.pwdRules = [   //验证两次密码是否相同
            {required: true, message: '请完成密码确认'},
            {validator: this.pwdValidator, message: '两次密码不相符'}
        ];
        return {
            username: '',       // 注册邮箱
            nickname: '',   // 注册昵称
            password: '',   // 注册密码
            confirmPwd: ''  // 确认密码
        }
    },
    methods: {
        pwdValidator(val) {
            return this.password===val;
        },
        onSubmit(values) {
            delete values.confirmPwd;
            //console.log('submit', values);
            sendRegisterMsg(values).then(res => {
                const code = res.data.errno;
                const msg = res.data.msg;
                if(code === 0) {
                    Notify({ type: 'success', message: msg });
                    this.$router.push('/');
                } else {
                    Notify({ type: 'danger', message: msg });
                }
            })
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
.register {
    align-items: center;
    background: #f7f8fa;
}

</style>