<template>
    <div class="ask-card">
        <div class="ask-card-left">
            <img :src="answer.userAvater" @click="checkUser(answer.username)" alt="">
        </div>
        <div class="ask-card-right flex1">
            <div class="author">{{answer.nickname}}</div>
            <div class="time">{{answer.answerTime}}</div>
            <div class="content">{{answer.answerContent}}</div>
            <div class="function">
                <img src="../../assets/thumb.png" @click="giveThumb(answer.answerId,answer.username)" alt="">
                <div style="color: #4fa1dc;padding-right: 1.3em;" @click="giveThumb(answer.answerId,answer.username)">{{thumb}}</div>
                <img src="../../assets/cai.png" alt="" @click="thumbDown">
                <div style="color: #f6827a; padding-left: 2px;" @click="thumbDown">踩</div>
            </div>
        </div>
    </div>
</template>

<script>
import {thumbAns} from '../../network/answer';

import {Toast} from 'vant';
import Vue from 'vue';
Vue.use(Toast);

export default {
    name: 'AskCard',
    data() {
        return {
            thumb: 0
        }
    },
    props: ['answer'],
    mounted() {
        this.thumb = this.answer.thumb;
    },
    methods: {
        // 点赞
        giveThumb(aid,name) {
            thumbAns({
                answerId: aid,
                username1: this.$store.state.username,
                username2: name
            }).then(res => {
                console.log(res.data);
                let code = res.data.errno,msg = res.data.msg;
                Toast(msg);
                if(code === 0) {
                    this.thumb++;
                    this.$store.commit('CUTCOIN');
                }
            })
        },
        checkUser(id) {
            this.$router.push(`/checkuser/${id}`);
        },
        thumbDown() {
            Toast('踩一下也许会让您的心情好一点');
        }
    }
}
</script>

<style>
.show-ask .ask-list .ask-card {
    width: 100%;
    background: white;
    display: flex;
    border-bottom: 1px solid #ddd;
}

.show-ask .ask-list .ask-card:nth-last-of-type(1) {
    margin-bottom: 70px;
}

.show-ask .ask-list .ask-card .ask-card-left img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: right;
    margin: 8px;
}

.show-ask .ask-list .ask-card .ask-card-right>div {
    padding: 5px 10px 0 5px;
}

.show-ask .ask-list .ask-card .ask-card-right .time {
    color: #666666;
}

.show-ask .ask-list .ask-card .ask-card-right .content {
    margin-top: 15px;
    line-height: 160%;
}

.show-ask .ask-list .ask-card .ask-card-right .function {
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
}

.show-ask .ask-list .ask-card .ask-card-right .function img {
    width: 16px;
    height: 16px;
}
</style>