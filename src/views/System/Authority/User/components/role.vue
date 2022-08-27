
<template>
  <div style="margin-top: 16px">
    <a-card>
      <a-button type="primary" @click="addrole">新增角色</a-button>
      <div style="margin-top: 16px">
        <a-table :columns="columns" :data-source="RoleList" bordered>
          <span slot="action" slot-scope="text, record">
            <a @click="edit(record)">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除该角色？" @confirm="del(record)">
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a href="#">删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </a-card>
    <a-modal v-model="visiable" :title="item.roleType == null ? '添加角色' : '编辑角色'" @ok="handOk" @cancel="handelcancel">
      <a-form-model :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :rules="rules" ref="ruleForm">
        <a-form-model-item label="角色名称" prop="roleName">
          <a-input v-model="item.roleName" />
        </a-form-model-item>
        <a-form-model-item label="角色描述" prop="roleDescription">
          <a-textarea v-model="item.roleDescription" placeholder="描述下角色简介，不超过100字"
            :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "role",

  data() {
    return {
      RoleList: [],
      visiable: false,
      rules: {
        roleName: [
          {
            required: true,
            trigger: blur,
            message: "角色名称不能为空",
          },
          { max: 20, message: '角色名称不得超过20个字', trigger: ['blur'] },
        ],
        roleDescription: [
          { max: 100, message: '角色描述不得超过100个字', trigger: ['blur'] },
          {
            required: true,
            trigger: blur,
            message: "角色描述不能为空",
          },
        ],

      },
      columns: [
        { title: "序号", key: "key", dataIndex: "key", },
        { title: '角色名称', key: 'roleName', dataIndex: 'roleName' },
        { title: '角色名称', key: 'roleDescription', dataIndex: 'roleDescription' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, },
      ],
      item: {
        roleName: "",
        roleDescription: "",
        roleType: null
      }
    }
  },
  created() {

    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { result } = await api.getRoleList()
      this.RoleList = result.map((i, index) => {
        i.key = index + 1
        return i
      })
    },

    addrole() {
      this.visiable = true
    },
    edit(record) {
      this.visiable = true
      this.item = record

    },

    async del(record) {
      await api.deleteRole({ id: record.id })
      this.getRoleList()
      this.$message.success("删除成功")
    },
    async handOk() {
      if (this.item.roleType == null) {
        this.item.roleType = this.RoleList.length + 1;
        await api.insertRole(this.item)
        this.$message.success("添加成功")
      } else {
        await api.updateRoleDetail(this.item)
        this.$message.success("修改成功")
      }

      this.getRoleList()
      this.visiable = false
      this.item = {
        roleName: "",
        roleDescription: "",
        roleType: null
      }

    },
    handelcancel() {
      this.visiable = false
      this.item = {
        roleName: "",
        roleDescription: "",
        roleType: null
      }
    },
  },
};
</script>

<style>
</style>
