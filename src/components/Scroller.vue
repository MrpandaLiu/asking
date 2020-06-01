<template>
  <div class="bar-container">
    <div :style="move" class="scroll">
      <img v-if="current" :src="current.img" alt />
      <img v-if="next" :src="next.img" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroller",
  created() {
    this.renderPic();
  },
  data() {
    return {
      current: null,
      next: null,
      index: 0,
      nextI: 1,
      move: "left: 0;"
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * 熊猫高性能轮播图
     *
     * 留两个图片插槽，分别叫current和next
     * 触发轮播时，current和next先花费若干时间向左移
     * 移动完成后，位置瞬间还原，用next代替current，下一张图片代替next
     */
    renderPic() {
      // 初始化
      this.current = this.data[this.index];
      this.next = this.data[this.nextI];
      setInterval(() => {
        // 先.8s左移
        this.move = "left: -100%;transition: .8s;";
        setTimeout(() => {
          // 瞬间变换
          this.move = "left: 0;";
          // 图片转移
          this.index++;
          this.nextI++;
          // 临界
          if (this.nextI === this.data.length) {
            this.nextI = 0;
          }
          if (this.index === this.data.length) {
            this.index = 0;
          }
          this.current = this.data[this.index];
          this.next = this.data[this.nextI];
        }, 1000);
      }, 5000);
    }
  }
};
</script>

<style>
.bar-container {
  width: 100%;
  height: 200px;
  overflow-y: hidden;
  position: relative;
}

.bar-container .scroll {
  width: 200%;
  display: flex;
  position: absolute;
}

.bar-container img {
  width: 50%;
  height: auto;
}
</style>