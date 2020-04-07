<template>
    <div class="answer-box">
        <warn-nav-bar title="回答问题箱"></warn-nav-bar>
        <!-- 遮罩层 -->
        <van-overlay :show="show" @click=goHome>
        <div class="wrapper" @click.stop>
            <div class="block">
                <!-- 密码输入框 -->
                <van-password-input
                :value="value"
                info="密码为 6 位数字"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
                />
                <div class="bottom-btn">
                    <van-button type="info" round @click="MatchPwd">确认密钥</van-button>
                    <van-button type="danger" round @click="goHome">返回主页</van-button>
                </div>
                <!-- 数字键盘 -->
                <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
                />
            </div>
        </div>
        </van-overlay>
        <h2 class="h2">{{title}}</h2>
        <div class="describe">{{content}}</div>
        <!-- 评论框 -->
        <van-field
        v-model="answer"
        rows="5"
        autosize
        label="我的回答"
        type="textarea"
        maxlength="100"
        placeholder="请输入回答"
        show-word-limit
        />
        <van-field name="switch" label="是否匿名"> 
        <template #input>
            <van-switch v-show="!show" v-model="anonymous" size="20" disabled/>
        </template>
        </van-field>
        <van-button type="info" size="large" round @click="handleComment">提交评论</van-button>
    </div>
</template>

<script>
// 引入方法
import {UseComponents} from '../../utils';
import {DetailBox} from '../../network/question';
import {addBoxAns} from '../../network/answer';
// 引入组件
import WarnNavBar from '../../components/WarnNavBar';
import Vue from 'vue';
import { Overlay,Button,PasswordInput,NumberKeyboard,Toast,Field,Switch } from 'vant';
UseComponents(Vue,Overlay,Button,PasswordInput,NumberKeyboard,Toast,Field,Switch);

export default {
    name: 'AnserBox',
    data() {
        return {
            show: true,     // 显示遮罩层
            key: 123456,    // 密钥
            value: '',      // 填写的密码
            showKeyboard: true,     // 展示数字键盘
            answer: '',     // 评论的回答
            anonymous: true,     // 是否匿名
            boxId: '',      // 问题箱id
            title: '',      // 问题箱标题
            content: '',    // 问题箱内容
        }
    },
    mounted() {
        let id = this.$route.params.boxid;
        // 获取问题箱内容
        DetailBox({
            boxId: Number(id)
        }).then(res => {
            console.log(res.data);
            let code = res.data.errno;
            if(code === 0) {
                let box = res.data.result;
                this.boxId = box.boxId;
                this.key = box.boxPassword;
                this.title = box.boxTitle;
                this.content = box.boxContent;
            } else {
                Toast('访问失败');
                this.$router.path('/home');
            }
        })
    },
    methods: {
        // 匹配密钥
        MatchPwd() {
            if(this.value == this.key) {
                this.show = false;
                this.showKeyboard = false;
            } else {
                Toast('密钥错误');
            }
        },
        // 返回主页
        goHome() {
            this.$router.push('/home');
        },
        // 提交问题箱评论
        handleComment() {
            if(this.answer !== '') {
                addBoxAns({
                    username: this.$store.state.username,
                    boxAcontent: this.answer,
                    boxId: this.boxId
                }).then(res => {
                    console.log(res.data);
                    let code =res.data.errno,msg = res.data.msg;
                    Toast(msg);
                    if(code === 0) {
                        this.$router.push('/home');
                    }
                })
            } else {
                Toast('回答不能为空');
            }
        },
        // 输入数字键盘
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        // 删除数字键盘
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        }
    },
    components: {
        WarnNavBar
    }

}
</script>

<style>
.answer-box {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
}

.answer-box  .h2 {
    color: black;
    padding-left: 10px;
}

.answer-box .answer-tag {
    margin-left: 15px;
    padding: 10px;
    background: white;
    display: inline-block;
    color: rgb(250, 135, 135);
}

.answer-box .describe {
  margin: 15px 20px 15px 20px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  line-height: 150%;
  font-size: 1.05rem;
  color: #999999;
}

.answer-box .bottom-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 10px 0 10px 0;
}

</style>