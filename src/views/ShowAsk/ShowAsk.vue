<template>
    <div class="show-ask">
        <nav-bar title="查看问题"></nav-bar>
        <div class="ask-list">
            <show-title :Title="titleData" v-if="titleData"></show-title>
            <van-loading v-if="loading" size="24px">加载中...</van-loading>
            <ask-card v-for="(item,index) in answerList" :key="index" :answer="item" v-show="answerList"></ask-card>
        </div>
        <div class="comment">
            <div class="flex-center flex3">
                <van-field v-model="comment" placeholder="请输入对该问题的评论" />
            </div>
            <div class="flex-center flex1">
                <van-button type="info" @click="handleComment" round>发布评论</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import {UseComponents} from '../../utils';
import {detailQuestion} from '../../network/question';
import { answerList,addAns } from "../../network/answer";
import Event from '../../utils/event-bus';

import NavBar from '../../components/NavBar';
import ShowTitle from './ShowTitle';
import AskCard from './AskCard';
import {Button,Field,Toast,Loading} from 'vant';
import Vue from 'vue';
UseComponents(Vue,Button,Field,Toast,Loading)
export default {
    name: 'ShowAsk',
    data() {
        return {
            questionId: '',
            comment: '',
            titleData: '',
            answerList: [],
            loading: true
        }
    },
    mounted() {
        this.questionId = Number(this.$route.params.askid);
        detailQuestion({
            questionId: this.questionId
        }).then(res => {
            console.log(res.data);
            let code = res.data.errno;
            if(code === 0) {
                this.titleData = res.data.result;
            } else {
                Toast('问题获取失败');
            }
        }).then(this.loadAns())
    },
    methods: {
        // 加载该问题的所有回答
        loadAns() {
            answerList({
                questionId: this.questionId
            }).then(res => {
                console.log(res.data.result);
                let code = res.data.errno;
                this.loading = false;
                if(code === 0) {
                    this.answerList = res.data.result;
                } else {
                    Toast('回答获取失败');
                }
            })
        },
        // 评论
        handleComment() {
            if(this.comment !== '') {
                this.loading = true;
                addAns({
                    questionId: this.questionId,
                    answerContent: this.comment,
                    username: this.$store.state.username
                }).then(res => {
                    console.log(res.data);
                    let code = res.data.errno,msg = res.data.msg;
                    Toast(msg);
                    if(code === 0) {
                        this.$store.commit('ADDANS');
                        this.answerList = res.data.result;
                        this.loading = false;
                        this.comment = '';
                        Event.$emit('addComment',1);
                    }
                })
            } else {
                Toast('评论不能为空');
            }
        }
    },
    components: {
        NavBar,
        ShowTitle,
        AskCard
    }
}
</script>

<style>
.show-ask {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.show-ask .ask-list {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
    overflow: auto;
}

.comment {
    width: 100%;
    height: 60px;
    position: fixed;
    background: white;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 20px 2px rgba(0,0,0,0)
}
</style>