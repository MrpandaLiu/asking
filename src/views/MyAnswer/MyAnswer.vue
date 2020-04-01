<template>
    <div class="myanswer flex-column">
        <nav-bar title="我的回答"></nav-bar>
        <van-loading v-if="loading" size="24px">加载中...</van-loading>
        <div class="answer-list">
            <div class="answer-card" @click="goQuestion(item.questionId)"
            v-for="(item,index) in list" :key="index">
                <div class="first">
                    <div class="pic flex1 flex-center"><img :src="item.userAvater" alt=""></div>
                    <div class="name-time flex-column">
                        <div class="name">{{item.nickname}}</div>
                        <div class="time">{{item.answerTime}}</div>
                    </div>
                </div>
                <div class="second">
                    <div>回复：{{item.answerContent}}</div>
                </div>
                <div class="second">
                    <div>问题：{{item.questionTitle}}</div>
                </div>
                <div class="third">
                    <div class="flex1">{{item.thumb}}赞 · <span style="color:red;" @click="deleteAnswer(item.answerId)">删除</span></div>
                    <div class="flex3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {myAns,deleteAns} from '../../network/answer';
import {UseComponents} from '../../utils';

import NavBar from '../../components/NavBar';
import {Toast,Loading,Dialog} from 'vant';
import Vue from 'vue';
UseComponents(Vue,Toast,Loading,Dialog);

export default {
    name: 'MyAnswer',
    data() {
        return {
            list: [],
            loading: true
        }
    },
    mounted() {
        myAns({
            username: this.$store.state.username
        }).then(res => {
            console.log(res.data);
            let code = res.data.errno;
            if(code === 0) {
                this.list = res.data.result;
                this.loading = false;
            } else {
                Toast('加载失败');
            }
        })
    },
    methods: {
        goQuestion(id) {
            this.$router.push(`/showask/${id}`)
        },
        deleteAnswer(id) {
            Dialog.confirm({
                title: '删除',
                message: '请确认是否删除该问题？'
            }).then(() => {
                // on confirm
                this.loading = true;
                deleteAns({
                    answerId: id,
                    username: this.$router.username
                }).then(res => {
                    console.log(res.data);
                    let code = res.data.errno;
                    if(code === 0) {
                        this.list = res.data.result;
                        this.loading = false;
                        this.$store.commit('CUTANS');
                    }
                })
            }).catch(() => {
            // on cancel
            });
            window.event.stopPropagation();
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
.myanswer {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
}

.myanswer .answer-list {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.myanswer .answer-card {
    width: 100%;
    background: white;
    margin-bottom: 10px;
}

.myanswer .answer-card .first {
    height: 60px;
    display: flex;
    background: white;
}

.myanswer .answer-card .first .pic img {
    width: 60%;
    height: 70%;
    border-radius: 5px;
}

.myanswer .answer-card .first .name-time {
    flex: 5;
    justify-content: center;
}

.myanswer .answer-card .first .name-time .time {
    color: #666666;
}

.myanswer .answer-card .second {
    font-size: 1.1rem;
    padding: 10px 0 10px 10px;
}

.myanswer .answer-card .third {
    height: 15px;
    padding-bottom: 20px;
    color: #1296db;
    display: flex;
}

.myanswer .answer-card .third>div:nth-of-type(1) {
    padding-left: 10px;
    color: #666666;
}

.myanswer .answer-card .third img {
    width: 18px;
    height: 18px;
    margin-left: 70%;
}

</style>