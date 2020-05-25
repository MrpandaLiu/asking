<template>
  <div class="help">
    <nav-bar title="帮助/提示"></nav-bar>
    <div class="help-container">
      <p>1. 提问有普通问题和私密问题</p>
      <p>2. 问题箱：一种私密问题。该类问题的回答者仅可以通过Id搜索到问题，输入密钥后查看，并且所有回答都是匿名状态。</p>
      <p>3.硬币：软件内虚拟货币。每日签到可以获取2枚硬币，为赞同的回答点赞时会消耗硬币，并且该硬币会转移给回答者。</p>
      <p>4.称号：根据持有硬币数所给予的等级，依次为：见习、水手、舰长、提督、总督。称号等级高者可表明他收到过大量的赞或者使用此软件的时间较长。</p>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar";

export default {
  name: "Help",
  components: {
    NavBar
  }
};
</script>

<style>
.help {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.help .help-container {
  width: 90%;
  margin: 10px auto;
  background: white;
}

.help div p {
  margin-top: 15px;
  font-size: 1.2rem;
  line-height: 150%;
}
</style>