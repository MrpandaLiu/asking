<template>
    <div class="check-user">
        <nav-bar title="查看用户"></nav-bar>
        <div class="center-info" v-if="avatar">
            <div class="avatar flex1 flex-center">
                <img :src="avatar" alt="avatar">
            </div>
            <div class="username-intro flex-column">
                <h3>{{nickname}}<span style="color: #1989fa;" v-if="gender == 0"> ♂</span> <span style="color:pink;" v-else> ♀</span></h3>
                <div>{{profile}}</div>
            </div>
            <div class="flex1 flex-center">
            </div>
        </div>
        <div class="user-data" v-if="avatar">
            <div class="user-data-item flex1 flex-column flex-center">
                <h3>{{title}}</h3>
                <div>称号</div>
            </div>
            <div class="user-data-item flex1 flex-column flex-center">
                <h3>{{coin}}</h3>
                <div>硬币</div>
            </div>
            <div class="user-data-item flex1 flex-column flex-center">
                <h3>{{queCount}}</h3>
                <div>提问</div>
            </div>
            <div class="user-data-item flex1 flex-column flex-center">
                <h3>{{ansCount}}</h3>
                <div>回答</div>
            </div>
        </div>
    </div>
</template>

<script>
import {checkUser} from '../../network/user';
import NavBar from '../../components/NavBar';

export default {
    name: 'CheckUser',
    data() {
        return {
            nickname: '',
            gender: '',
            profile: '',
            coin: '',
            avatar: '',
            queCount: '',
            ansCount: '',
            title: ''
        }
    },
    mounted() {
        let username = this.$route.params.username;
        checkUser({
            username: username
        }).then(res => {
            console.log(res.data);
            let user = res.data.result;
            this.nickname = user.nickname;
            this.profile = user.profile;
            this.gender = user.gender;
            this.coin = user.coin;
            this.avatar = user.avater;
            this.queCount = user.queCount;
            this.ansCount = user.ansCount;

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
        })
    },
    components: {
        NavBar,
    }
}
</script>

<style>
.check-user {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
}

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
    color: #1989fa;
}

.center-info .username-intro>div {
    color: #666666;
}

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