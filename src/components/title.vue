<!--
 * @Author: eureka
 * @Date: 2022-09-08 19:36:41
 * @LastEditors: eureka
 * @LastEditTime: 2022-09-09 10:27:17
-->
<template>
  <div class="top">
    <div class="title">
      {{ title }}
      <a-tooltip :title="tips" v-if="istooltip">
        <a-icon type="question-circle" style="margin-left: 5px;fontSize:14px" />
      </a-tooltip>
    </div>
    <slot style="eye"></slot>
  </div>
</template>

<script>
export default {
  name: "Overviewtitle",
  props: {
    title: {
      type: String,
      default: "",
    },
    istooltip: {
      type: Boolean,
      default: false,
    },
    tips: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  border-bottom: 1px solid #00000008;
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

  .eye {
    display: none;
  }
}
</style>
