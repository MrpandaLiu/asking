<template>
    <div class="center-info">
        <div class="avatar flex1 flex-center">
            <img @click="goEdit" :src="$store.state.avatar" alt="avatar">
        </div>
        <div class="username-intro flex-column">
            <h3>{{$store.state.nickname}}<span style="color: #1989fa;" v-if="$store.state.gender == 0"> ♂</span> <span style="color:pink;" v-else> ♀</span></h3>
            <div>{{$store.state.profile}}</div>
        </div>
        <div class="flex1 flex-center">
            <van-button type="primary" round @click="checkIn">签 到</van-button>
        </div>
    </div>
</template>

<script>
import {checkIn} from '../../network/user';

import {Button,Toast} from 'vant';
import Vue from 'vue';
Vue.use(Button);
Vue.use(Toast);

export default {
    name: 'UserBasic',
    methods: {
        goEdit() {
            this.$router.push('/user/edit');
        },
        // 签到
        checkIn() {
            checkIn({
                username: this.$store.state.username
            }).then(res => {
                console.log(res.data);
                let code = res.data.errno,msg = res.data.msg;
                Toast(msg);
                if(code === 0) {
                    this.$store.commit('ADDCOIN');
                }
            })
        }
    }
}
</script>

<style>
.center-info {
    width: 100%;
    height: 100px;
    background: white;
    display: flex;
        border-bottom: 1px solid #ddd;
}

.center-info .avatar img{
    width: 75%;
    max-width: 70px;
    height: 70%;
    border-radius: 50%;
}

.center-info .username-intro {
    flex: 2.3;
    justify-content: center;
    margin-left: 10px;
}

.center-info .username-intro>h3 {
    padding-bottom: 5px;
}

.center-info .username-intro>h3 span {
    font-size: .9rem;
}

.center-info .username-intro>div {
    color: #666666;
}
</style>