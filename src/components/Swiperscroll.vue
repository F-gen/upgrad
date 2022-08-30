<!--
 * @Author: eureka
 * @Date: 2022-08-30 18:53:57
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-30 19:02:05
-->
<template>
  <div>
    <div class="focus" v-show="record.length === 0 ? false : true">
      <div class="arrow-l" @click="left">&lt;</div>
      <div class="mainscroll">
        <!-- , -->
        <ul
          class="div"
          :style="{
            transform: `translateX(${num * -basewith}px)`,
            width: `${200 * record.length}%`,
          }"
        >
          <li v-for="item in record" :key="item">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="arrow-r" @click="right">&gt;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiperscroll",
};
</script>

<script setup>
const num = ref(0);
const basewith = ref(0);
const props = defineProps({
  record: {
    type: Array,
    default: () => [],
  },
});
const left = () => {
  basewith.value = 100;
  if (num.value > 0) {
    num.value--;
  }
};
const right = () => {
  basewith.value = 100;
  if (num.value < props.record.length - 1) {
    num.value++;
  }
};
</script>

<style scoped lang="less">
.focus {
  width: 132px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  .arrow-l,
  .arrow-r {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: #f2f6fc;
    line-height: 20px;
    text-align: center;
    font-weight: 700;
    font-size: 12px;
  }
}
.mainscroll {
  width: 92px;
  height: 20px;
  overflow: hidden;
  .div {
    // width: 1000%;
    height: 20px;
    transition: 0.3s linear;
    li {
      width: 60px; //暂时 5个字的 轮流  动态判断几个字符  设置该宽度 及整体宽度  边距
      margin-left: 20px;
      margin-right: 20px;
      float: left;
    }
  }
  a {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
