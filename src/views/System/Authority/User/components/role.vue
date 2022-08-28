<template>
  <div style="margin-top: 16px">
    <a-card>
      <a-button type="primary" @click="addrole">新增角色</a-button>
      <div style="margin-top: 16px">
        <a-table :columns="columns" :data-source="RoleList" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a @click="edit(record)">Edit</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除该类型 ?" @confirm="del(record)">
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a href="#">Delete</a>
              </a-popconfirm>
            </template>
          </template>

        </a-table>
      </div>
    </a-card>
    <a-modal :visible="visiable" :title="item.roleType == null ? '添加角色' : '编辑角色'" @ok="handOk" @cancel="handelcancel">
      <a-form :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" ref="ruleForm">
        <a-form-item label="角色名称" name="roleName" :rules="[
  {
    required: true,
    trigger: 'blur',
            message: '角色名称不能为空',
          },
          { max: 20, message: '角色名称不得超过20个字', trigger: ['blur'] }
        ]">
          <a-input v-model:value="item.roleName" />
        </a-form-item>
        <a-form-item label="角色描述" name="roleDescription" :rules="[
          { max: 100, message: '角色描述不得超过100个字', trigger: ['blur'] },
          {
            required: true,
            trigger: 'blur',
            message: '角色描述不能为空',
          },
        ]">
          <a-textarea v-model:value="item.roleDescription" placeholder="描述下角色简介，不超过100字"
            :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: 'role',
};
</script>

<script setup>
const RoleList = ref([])
const visiable = ref(false)
const columns = ref([
  { title: "序号", key: "key", dataIndex: "key", },
  { title: '角色名称', key: 'roleName', dataIndex: 'roleName' },
  { title: '角色名称', key: 'roleDescription', dataIndex: 'roleDescription' },
  { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, },
])
const item = reactive({
  roleName: "",
  roleDescription: "",
  roleType: null,
  id: null,
})
const getRoleList = async () => {
  const { result } = await api.getRoleList()
  RoleList.value = result.map((i, index) => {
    i.key = index + 1
    return i
  })
}
getRoleList()
const addrole = () => {
  visiable.value = true
}
const edit = (record) => {
  item.roleName = record.roleName
  item.roleDescription = record.roleDescription
  item.roleType = record.roleType
  item.id = record.id
  visiable.value = true
}
const del = async (record) => {
  await api.deleteRole({ id: record.id })
  getRoleList()
  message.success("删除成功")
}
const ruleForm = ref()


const handOk = async () => {
  await ruleForm.value.validate()
  if (item.roleType == null) {
    item.roleType = Math.floor(Math.random() * 1000) + ''
    const res = await api.insertRole({ ...item })
    if (res.success) {
      message.success("添加成功")
    } else {
      message.error(res.message)
    }
  } else {
    await api.updateRoleDetail({ ...item })
    message.success("修改成功")
  }

  getRoleList()
  visiable.value = false
  item.roleDescription = ""
  item.roleName = ""
  item.roleType = null
  item.id = null

}
const handelcancel = () => {
  ruleForm.value.resetFields();
  item.roleDescription = ""
  item.roleName = ""
  item.roleType = null
  visiable.value = false
  item.id = null
}
</script>
