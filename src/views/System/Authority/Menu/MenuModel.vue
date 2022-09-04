<template>

  <a-modal :visible="visiable" :title="item.id == null ? '新增' : '编辑'" @ok="handleOk" @cancel="handleCancel">
    <a-form :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :rules="rules" ref="ruleForm">
      <a-form-item label="类型">
        <a-radio-group v-model:value="item.type" :default-value="0">
          <a-radio :value="0"> 页面 </a-radio>
          <a-radio :value="1"> 按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="item.type == 1 ? '按钮名称' : '页面名称'" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>

      <a-form-item :label="item.type == 1 ? '按钮标签' : '页面标签'" name="tag">
        <a-input v-model:value="item.tag" :disabled="item.id == null ? false : true" />
      </a-form-item>
    </a-form>
  </a-modal>

</template>
<script>
import { nanoid } from "nanoid";
export default {
  name: "Menu_model",
};
</script>
  <script setup>
  let visiable = ref(false);

  let item = reactive({
    id: null,
    children: [],
    path: "",
    key: "",
    hide: 0,
    type: 0,
    tag: "",
    name: "",
  });
  
  const rules = reactive({
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
  })
  const emits = defineEmits(["addMenu", "editMenu"]);

  const ruleForm = ref();
  defineExpose({
    visiable,
    item,
  });
  const handleOk = async () => {
   
    await ruleForm.value.validate();
    if (item.id == null) {
      // 新增
      item.id=nanoid()
      item.key=nanoid(3)
      emits('addMenu', item)
      console.log(item, 'add');
    } else {
      // 编辑
      emits('editMenu', item)
  
    }
       visiable.value=false
 
  };
  const handleCancel = () => {
    reset()
   
  };
  const reset = () => {
    console.log('resetstart');
    visiable.value=false;
    item.id = null;
    item.children = [];
    item.path = "";
    item.key = "";
    item.hide = 0;
    item.type = 0;
    item.tag = "";
    item.name = "";
    console.log('resetend');
  }
  </script>
