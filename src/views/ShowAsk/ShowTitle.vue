<template>
    <div class="ask-title">
        <h2 class="h2">{{Title.questionContent}} <van-tag mark type="success"> {{Title.tag}}</van-tag></h2>
        <div class="author"><strong>来自：</strong>{{Title.nickname}}</div>
        <div class="author"><strong>描述：</strong>{{Title.questionContent}}</div>
        <div class="question-info">
            <span>{{Title.questionView}} 浏览 </span> · <span> {{Title.commentCount}} 评论</span>
        </div>
    </div>
</template>

<script>
import {Tag} from 'vant';
import Vue from 'vue';
Vue.use(Tag);

export default {
    name: 'ShowTitle',
    props: ['Title']
}
</script>

<style>
.show-ask .ask-title {
    background: white;
    border-bottom: 1px solid rgba(0,0,0,.2);
    margin-bottom: 10px;
}

.show-ask .ask-title .author {
    color: #666666;
    padding: 5px 15px 5px 15px;
    line-height: 150%;
}

.show-ask .ask-title .question-info {
    color: #999999;
    padding: 5px 0 15px 15px;
}
</style>