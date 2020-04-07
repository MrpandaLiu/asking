<template>
    <!-- 四项数据栏 -->
    <div class="user-data">
        <div class="user-data-item flex1 flex-column flex-center">
            <h3>{{title}}</h3>
            <div>称号</div>
        </div>
        <div class="user-data-item flex1 flex-column flex-center">
            <h3>{{this.$store.state.coin}}</h3>
            <div>硬币</div>
        </div>
        <div class="user-data-item flex1 flex-column flex-center">
            <h3>{{$store.state.queCount}}</h3>
            <div>提问</div>
        </div>
        <div class="user-data-item flex1 flex-column flex-center">
            <h3>{{$store.state.ansCount}}</h3>
            <div>回答</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CenterData',
    data() {
        return {
            title: ''   // 称号
        }
    },
    mounted() {
        if(this.$store.state.coin < 50) {
             this.title = '萌新';
        } else if(this.$store.state.coin < 200) {
            this.title = '见习';
        } else if(this.$store.state.coin < 1000) {
            this.title = '水手';
        } else if(this.$store.state.coin < 5000) {
            this.title = '舰长';
        } else if(this.$store.state.coin < 10000) {
            this.title = '提督';
        } else {
            this.title = '总督';
        }
    }
}
</script>

<style>
.user-data {
    width: 100%;
    height: 100px;
    display: flex;
    background: white;
    border-bottom: 1px solid rgba(0,0,0,.1);
}

.user-data .user-data-item>div {
    padding-top: 5px;
    color: #858585;
}
</style>