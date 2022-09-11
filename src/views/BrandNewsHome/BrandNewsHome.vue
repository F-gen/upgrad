<template>
  <div class="search">
    <div class="recommandKeyword">
      <div class="left">
        <OverviewTitle title="站外品牌各平台互动量vs站内品牌旗舰店指数" :istooltip="true" tips="notice">
        </OverviewTitle>
        <div class="topcontent">
          <div class="title"></div>
          <div class="ranking"></div>
        </div>
      </div>
      <div class="right">
        <OverviewTitle title="站外品牌各平台互动量vs站内品牌旗舰店指数" :istooltip="true" tips="notice">
        </OverviewTitle>
        <div class="topcontent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewTitle from '@/components/title.vue'
export default {
  name: 'BrandNewsHome',
};
</script>

<script setup>

</script>
<style lang="less" scoped>
.search {
  padding: 16px 10px;
  background-color: #f1f2f6;
}

.recommandKeyword {
  display: flex;
  margin-top: 16px;

  .left,
  .right {
    width: 49.5%;
    border-radius: 8px;
    background-color: #fff;

    .topcontent {
      height: 264px;

    }
  }

  .right {
    margin-left: 16px;
  }
}
</style>
