<template>
    <div class="home flex-column">
        <home-header></home-header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-loading v-if="loading" size="24px">加载中...</van-loading>
            <home-card v-for="(item,index) in this.$store.state.HomeList" :key="index" :question="item"></home-card>
        </van-pull-refresh>
    </div>
</template>

<script>
import {UseComponents} from '../../utils';
import {showHomeQuestion} from '../../network/question';

import HomeHeader from './HomeHeader.vue';
import HomeCard from './HomeCard.vue';
import Vue from 'vue';
import { PullRefresh,Toast,Loading } from 'vant';
UseComponents(Vue,PullRefresh,Toast,Loading);

export default {
    name: 'Home',
    data() {
        return {
            count: 0,
            isLoading: false,
            loading: true
        }
    },
    mounted() {
        showHomeQuestion().then(res => {
            console.log(res.data);
            let result = res.data.result;
            this.loading = false;
            this.$store.commit('HOME_LIST', {
                HomeList: result
            });
        })
    },
    methods: {
        onRefresh() {
            showHomeQuestion().then(res => {
                console.log(res.data);
                let result = res.data.result;
                this.$store.commit('HOME_LIST', {
                    HomeList: result
                });
                Toast('刷新成功');
                this.isLoading = false;
            })
        }
    },
    components: {
        HomeHeader,
        HomeCard
    }
}
</script>

<style>
.home {
    width: 100%;
    height: 100%;
}

.van-pull-refresh {
    height: 100%;
    overflow: auto;
    background: #f7f8fa;
}

</style>