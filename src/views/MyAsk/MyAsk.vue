<template>
    <div class="myask flex-column">
        <nav-bar title="我的提问"></nav-bar>
        <van-tabs v-model="active" color="#1989fa">
            <van-tab title="问题">
            </van-tab>
            <van-tab title="问题箱"></van-tab>
        </van-tabs>
        <van-loading v-if="loading" size="24px">加载中...</van-loading>
        <div class="ask-list flex-column">
            <div v-for="(item,index) in askList" :key="index" 
            v-show="active === 0" class="ask-card" 
            @click="goAskDetail(item.questionId)">
                <div><h3>{{item.questionTitle}}</h3></div>
                <div class="time">
                    {{item.questionTime}}
                </div>
                <div class="question-intro">
                    {{item.questionContent}}
                </div>
                <div class="question-info">
                    <span>{{item.questionView}} 浏览 </span> · <span> {{item.commentCount}} 评论</span> · <span style="color: red;" @click="deleteAsk(item.questionId)"> 删除</span>
                </div>
            </div>
            <div v-for="(box,index) in boxList" :key="'info2'+index"
            v-show="active === 1" class="ask-card" 
            @click="goBoxDetail(box.boxId,box.boxTitle)">
                <div><h3>{{box.boxTitle}} <van-button @click="copyInfo(box.boxTitle,box.boxId,box.boxPassword)" size="mini" round>分享</van-button></h3></div>
                <div class="time">
                    {{box.boxTime}}
                </div>
                <div class="time">
                    <strong>Id：</strong>{{box.boxId}}
                </div>
                <div class="time">
                    <strong>密钥：</strong>{{box.boxPassword}}
                </div>
                <div class="question-intro">
                    {{box.boxContent}}
                </div>
                <div class="question-info">
                    <span> {{box.boxCount}} 评论</span> · <span style="color: red;" @click="deleteB(box.boxId)"> 删除</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {UseComponents} from '../../utils';
import {deleteQuestion,myquestion,boxList,deleteBox} from '../../network/question';

import NavBar from '../../components/NavBar';
import Vue from 'vue';
import { Tab, Tabs, Dialog,Toast,Loading,Button } from 'vant';
UseComponents(Vue,Tab,Tabs,Dialog,Toast,Loading,Button);

export default {
    name: 'MyAsk',
    data() {
        return {
            active: 0,  // 激活中的页面 
            askList: [],
            boxList: [],  
            loading: true,
        }
    },
    mounted() {
        myquestion({
            username: this.$store.state.username
        }).then(res => {
            let code = res.data.errno;
            if(code === 0) {
                this.askList = res.data.result;
                this.loading = false;
            } else {
                Toast('问题加载失败');
            }
        }).then(boxList({
            username: this.$store.state.username
        }).then(res => {
            console.log(res.data);
            let code = res.data.errno;
            if(code === 0) {
                this.boxList = res.data.result;
            } else {
                Toast('问题箱加载失败');
            }
        }))
    },
    methods: {
        deleteAsk(qId) {
            Dialog.confirm({
                title: '删除',
                message: '请确认是否删除该问题？'
            }).then(() => {
                // on confirm
                this.loading = true;
                deleteQuestion({
                    questionId: qId,
                    username: this.$store.state.username
                }).then(res => {
                    //console.log(res.data);
                    let code = res.data.errno,msg = res.data.msg;
                    Toast(msg);
                    if(code === 0) {
                        this.askList = res.data.result;
                        this.$store.commit('CUTQUE');
                    }
                    this.loading = false;
                })
            }).catch(() => {
            // on cancel
            });
            // 阻止事件冒泡
            window.event.stopPropagation();
        },
        deleteB(bid) {
            Dialog.confirm({
                title: '删除',
                message: '请确认是否删除该问题？'
            }).then(_ => {
                this.loading = true;
                deleteBox({
                    boxId: bid,
                    username: this.$store.state.username
                }).then(res => {
                    let code = res.data.errno,msg = res.data.msg;
                    Toast(msg);
                    if(code === 0) {
                        this.boxList = res.data.result;
                    }
                    this.loading = false;
                })
            }).catch(_ => {

            });
            window.event.stopPropagation();
        },
        goAskDetail(id) {
            this.$router.push(`/showask/${id}`);
        },
        goBoxDetail(id,title) {
            this.$router.push(`/showbox/${id}/${title}`)
        },
        copyInfo(title,id,pwd) {
            let _input = document.createElement('input');
            let mydata = `我的问题是“${title}”,请打开网址：http://192.168.43.77:8080/answerbox/${id},输入密钥：${pwd}后即可回答`;
            _input.value = mydata;
            document.body.appendChild(_input);
            _input.select();
            document.execCommand("Copy");
            document.body.removeChild(_input);
            Toast('复制成功');
            window.event.stopPropagation();
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
.myask {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.ask-list {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
    overflow: auto;
}

.ask-list .ask-card {
    width: 100%;
}

.ask-card {
    margin-bottom: 10px;
    width: 100%;
    background: white;
    border-top: 1px solid rgb(238, 236, 236);
    border-bottom: 1px solid rgba(0,0,0,.2);
}

.ask-card>div {
    padding: 10px 10px 0 10px;
}

.ask-card h3 {
    font-weight: 550;
}

.ask-card .time {
    display: flex;
    align-items: center;
    color: #666666;
}

.ask-card .question-intro {
    color: #666666;
}

.ask-card .question-info {
    color: #999999;
    margin-bottom: 15px;
}
</style>