<template>
  <div class="center">
        <nav-bar title="个人中心"></nav-bar>
        <user-basic></user-basic>
        <center-data></center-data>
        <div class="func-list">
            <center-func url="/answerlist" imgsrc="checkQ.png" title="我的回答"></center-func>
            <center-func url="/myask" imgsrc="checkB.png" title="我的提问"></center-func>
            <center-func url="/askquestion" imgsrc="buildQ.png" title="创建问题"></center-func>
            <center-func url="/" imgsrc="help.png" title="帮助/提示"></center-func>
        </div>
        <div class="center-func">
            <div class="center-func-left flex-center">
                <img src="../../assets/quit.png" alt="">
            </div>
            <div class="center-func-center" @click="quit">
                <h2 style="color: #da2912;">退 出</h2>
            </div>
            <div class="center-func-right flex-center">
            </div>
        </div>
  </div>
</template>

<script>

// 引入组件
import NavBar from '../../components/NavBar';
import UserBasic from './UserBasic';
import CenterData from './CenterData';
import CenterFunc from './CenterFunc';

export default {
    name: 'Center',
    methods: {
        quit() {
            window.localStorage.removeItem('user');
            this.$router.push('/');
        }
    },
    components: {
        NavBar,
        UserBasic,
        CenterData,
        CenterFunc
    }
}
</script>

<style>
.center {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
}

.center .func-list {
    width: 100%;
    margin-top: 20px;
}

</style>