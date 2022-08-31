<template>
  <div class="page">
    <div class="left">
      <div class="title">角色列表</div>
      <div class="body">
        <div class="check">
          <a-radio-group v-model:value="roleId" @change="change">
            <a-radio v-for="i in roleList" :key="i.roleType" :style="radioStyle" :value="i.roleType">
              {{  i.roleName  }}
            </a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">菜单列表</div>
      <div class="body">
        <a-tree checkable :tree-data="treeData" @drop="onDrop" draggable v-model:value="checkedKeys" @check="onCheck"
          v-if="treeData.length > 0" :defaultExpandedKeys="expandedKeys">
          <template v-slot:title="nodeData">
            <span style="margin-right: 15px">{{  nodeData.name  }}</span>
            <div style="float: right">
              <span v-if="nodeData.dataRef.name != 'Root'" style="margin-right: 8px" @click="edit(nodeData)">
                <a-icon type="form" />
              </span>
              <span style="margin-right: 8px" @click="add(nodeData)" v-if="nodeData.children">
                <a-icon type="plus" />
              </span>
              <a-popconfirm title="确定要删除吗？" @confirm="del(nodeData)">
                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                <span v-if="nodeData.dataRef.name != 'Root'">
                  <a-icon type="delete" />
                </span>
              </a-popconfirm>

            </div>
          </template>
        </a-tree>
      </div>
    </div>
    <Model ref="model" @ok="addMenu" @edit='editMenu' />
  </div>
</template>

<script>
export default {
  name: 'auth-menu',
};
</script>

<script setup>

</script>
<style lang="scss" scoped>
    .title {
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
    }
  
    .body {
      padding: 24px;
      height: 720px;
      overflow: scroll;
    }
  
    .check {
      padding: 0 10px 24px 10px;
    }
  
    .page {
      padding: 16px;
      height: 820px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: #f1f2f6;
  
      .left {
        width: 300px;
  
        background-color: #fff;
      }
  
      .right {
        width: calc(100% - 300px);
        margin-left: 16px;
        background-color: #fff;
      }
    }
  
</style>
  