<!--
 * @Author: eureka
 * @Date: 2022-08-11 15:45:32
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-25 15:00:33
-->
<template>
  <div>
    <a-modal
      v-model="visiable"
      :title="this.item.id == null ? '新增' : '编辑'"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="item"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        :rules="rules"
        ref="ruleForm"
      >
        <a-form-item label="类型">
          <a-radio-group v-model="item.type" :default-value="0">
            <a-radio :value="0"> 页面 </a-radio>
            <a-radio :value="1"> 按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-model-item
          :label="item.type == 1 ? '按钮名称' : '页面名称'"
          prop="name"
        >
          <a-input
            v-model="item.name"
          
          />
        </a-form-model-item>

        <a-form-model-item
          :label="item.type == 1 ? '按钮标签' : '页面标签'"
          prop="tag"
        >
        <!-- :disabled="this.item.id == null ? false : true" -->
          <a-input v-model="item.tag" :disabled="this.item.id == null ? false : true"   />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "menu-model",
  data() {
    return {
      visiable: false,
      where: "",
      allTreeData: [],
      editTargetKey: "",
      item: {
        id: null,
        children: [],
        path: "",
        key: "",
        hide: 0,
        type: 0,
        tag: "",
        name: "",
        remarks: null,
      },
      rules: {
        name: [
          {
            required: true,
            trigger: blur,
            message: "名称不能为空",
          },
          { max: 20, message: `名称不得超过20个字`, trigger: ["blur"] },
        ],
        tag: [
          {
            required: true,
            trigger: blur,
            message: "标签不能为空",
          },
          { max: 20, message: "标签不得超过20个字", trigger: ["blur"] },
        ],
      },
    };
  },
  methods: {
    async handleOk() {
      await this.$refs.ruleForm.validate();
      if (this.item.id == null) {
        this.item.id = nanoid();
        this.item.key = nanoid(3);
        this.$emit("ok", this.item, this.where);
        this.visiable = false;
      } else {
        //编辑
        this.$emit("edit", this.item, this.editTargetKey);
      }

      this.reset();
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields();
      this.reset();
      //   this.item = {
      //     typeName: "brand_type",
      //     value: "",
      //   };
    },
    reset() {
      this.item = {};
      this.item = {
        id: null,
        children: [],
        path: "",
        key: "",
        hide: 0,
        type: 0,
        tag: "",
        name: "",
        remarks: null,
      };
    },
  },
};
</script>

<style scoped lang="scss"></style>
