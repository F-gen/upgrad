<template>
  <div class="page">
    <div class="left">
      <div class="title">角色列表</div>
      <div class="body">
        <div class="check">
          <a-radio-group v-model:value="roleId" @change="change">
            <a-radio v-for="i in roleList" :key="i.roleType" :style="radioStyle" :value="i.roleType">
              {{ i.roleName }}
            </a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">菜单列表</div>
      <div class="body">
        <a-tree checkable :tree-data="treeData" @drop="onDrop" draggable v-model:checkedKeys="checkedKeys"
          @check="onCheck" v-if="treeData.length > 0" v-model:defaultExpandedKeys="expandedKeys">
          <template v-slot:title="nodeData">
            <span style="margin-right: 15px">{{ nodeData.name }}</span>
            <div style="float: right">
              <span v-if="nodeData.dataRef.name != 'Root'" style="margin-right: 8px" @click="edit(nodeData)">
                <edit-outlined />
              </span>
              <span style="margin-right: 8px" @click="add(nodeData)" v-if="nodeData.children">
                <plus-outlined />
              </span>
              <a-popconfirm title="确定要删除吗？" @confirm="del(nodeData)">


                <span v-if="nodeData.dataRef.name != 'Root'">
                  <delete-outlined />
                </span>
              </a-popconfirm>

            </div>
          </template>
        </a-tree>
      </div>
    </div>
    <MenuModel @addMenu="addMenu" @editMenu="editMenu" ref="menuModel" />
  </div>
</template>

<script>
import MenuModel from './MenuModel.vue'
import {message} from 'ant-design-vue'
export default {
  name: 'auth-menu',
};
</script>

<script setup>
    const store = useStore();
// role
const roleId = ref(1)
const checkedKeys = ref([])
const roleList = ref([])
const radioStyle = reactive({
  display: 'block',
  height: '30px',
  lineHeight: '30px',
})
const change = async () => {
  const roleIdList = await api.getRoleKeyList({
    roleId: roleId.value
  })
  checkedKeys.value = roleIdList.result.keyList
}
const getRoleList = async () => {
  const { result } = await api.getRoleList()
  roleList.value = result
}
getRoleList()
// tree

const treeData = ref([])
const nameKey=ref([])
const expandedKeys = ref(['root'])
const SaveMenu = async () => {
  await api.updateMenu(treeData.value[0])

  getMeunByRoleId('-1')
}
const getMeunByRoleId = async () => {
  const data = await api.getMeunByRole({
    roleId: '-1'
  })
  treeData.value = [data.result]
  const roleIdList = await api.getRoleKeyList({
    roleId: roleId.value
  })
  checkedKeys.value = roleIdList.result.keyList
}
getMeunByRoleId()
const menuModel = ref()
const wantoDelTag=ref([])
const wantoDelBtn=ref([])
const routerNameList=ref([])
const onCheck = async(checkedKeys, e) => {
  nameKey.value=[]
   getNameKey(treeData.value)
   routerNameList.value=[]
   wantoDelBtn.value=[]
   setRoleMenuSelect(checkedKeys,treeData.value)
   wantoDelTag.value=[]
   keyTurnToTag(e.halfCheckedKeys)
   wantoDelTag.value.map(item => {
                let result = routerNameList.value.findIndex(v => v == item)
                if (result !== -1) {
                   routerNameList.value.splice(result, 1)
                }
            })
   wantoDelTag.value.map(item => {
     let result = wantoDelBtn.value.findIndex(v => v == item)
       if (result !== -1) {
    wantoDelBtn.value.splice(result, 1)
     }
   })

   await api.saveRoleKeyList({
                btnNameList: wantoDelBtn.value,
                routerNameList: routerNameList.value,
                roleId: roleId.value,
                keyList: checkedKeys
            })
            await api.updateMenu(treeData.value[0])
           getMeunByRoleId()
          store.dispatch("user/getRoutByRole");

 }
const setRoleMenuSelect=(checkedKeys, treeData)=>{
  for (let i = 0; i < treeData.length; i++) {
                if (checkedKeys.includes(treeData[i].key)) {
                    treeData[i].hide = 1 // 若包含则  隐藏设置为false
                    // this.routerNameList.push(treeData[i].name)
                } else {
                    treeData[i].hide = 0  // 隐藏设置为true

                    if (treeData[i].type == 1) {
                        wantoDelBtn.value.push(treeData[i].tag)
                    } else {
                        routerNameList.value.push(treeData[i].tag)
                    }

                }
                if (treeData[i].children && treeData[i].children.length > 0) {
                  setRoleMenuSelect(checkedKeys, treeData[i].children)
                }
            }
}
const  keyTurnToTag=(halfKey) =>{
            // 把routername中有namekey 的删除
          nameKey.value.forEach((i, index) => {
                halfKey.forEach((item) => {
                    if (item == i.key) {
                      wantoDelTag.value.push(i.tag)
                    }
                })
            })
        }
const where = ref('')
const add = (data) => {
  menuModel.value.item.type= 0
  menuModel.value.item.tag=''
  menuModel.value.item.id=null
  menuModel.value.item.name=''
  menuModel.value.item.key=''
  menuModel.value.item.path=''
  menuModel.value.visiable = true
  where.value=data.data.name
  
}
const editTargetKey = ref('')
const edit = (data) => { 
  menuModel.value.visiable = true
  menuModel.value.item.type= data.data.type
  menuModel.value.item.tag=data.data.tag
  menuModel.value.item.id=data.data.id
  menuModel.value.item.name=data.data.name
  menuModel.value.item.key=data.data.key
  menuModel.value.item.path=data.data.path
  menuModel.value.item.children=data.data.children
  menuModel.value.item.hide=data.data.hide

  editTargetKey.value=data.data.key

}
const del = (data) => { 
  if (data.children.length > 0) {
              message.warning('请先删除子菜单')
                return
            }
            deleteTree(treeData.value, data.dataRef.name)

            SaveMenu()
}
const deleteTree=(treeList,id)=>{
  if (!treeList || !treeList.length) {
                return
            }
            for (let i = 0; i < treeList.length; i++) {
                if (treeList[i].name === id) {
                    treeList.splice(i, 1);
                    break;
                }
              deleteTree(treeList[i].children, id)
            }
}
const onDrop = info => {
  // console.log(info);
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (data, key, callback) => {
    data.forEach((item, index) => {
      if (item.key === key) {
        return callback(item, index, data);
      }

      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };

  const data = [...treeData.value]; // Find dragObject

  let dragObj;
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, item => {
      item.children = item.children || []; /// where to insert 示例添加到头部，可以是随意位置

      item.children.unshift(dragObj);
    });
  } else if ((info.node.children || []).length > 0 && // Has children
    info.node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, item => {
      item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

      item.children.unshift(dragObj);
    });
  } else {
    let ar = [];
    let i = 0;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });

    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }

  treeData.value = data;
  SaveMenu()
};
const addMenu =async(item) => {
   nameKey.value=[]
   getNameKey(treeData.value)
   let isAlreadyinMenu = nameKey.value.some((value) => value.name == item.name || value.tag == item.tag)
   if (isAlreadyinMenu) {
    message.warning('菜单名称或标签重复，请重新添加')
      return
    }else{
     addMenuchildren(treeData.value, item,where.value)
    if(treeData.value[0].children.length==0){
      await api.insertMenu(treeData.value[0])
     }else{
          // treeData.value[0].children.splice(5,8)
      await api.updateMenu(treeData.value[0])
     }
  }
  getMeunByRoleId()
 }
 const addMenuchildren=(data, item, where)=>{
  data.forEach(element => {
    if (element.name == where) {
          element.children.push(item)
       }
    if (element.children.length > 0) {
        addMenuchildren(element.children, item, where)
       }
   });
 }
const editMenu =async (item) => { 
  nameKey.value=[]
   getNameKey(treeData.value)
  nameKey.value = nameKey.value.filter(item => { return item.key !== editTargetKey.value })
            let isAlreadyinMenu = nameKey.value.some((value) => value.name == item.name || value.tag == item.tag)
            if (isAlreadyinMenu) {
              menuModel.value.visiable = false
              message.warning('已存在该标签，请重新修改')
                return
            } else {
              menuModel.value.visiable = false
              editMenuByKey(treeData.value, item, editTargetKey.value)
                SaveMenu()
            }
}
const editMenuByKey=(data, item, key,) =>{
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    data[i] = item
                    break
                }
                if (data[i].children) {
                  editMenuByKey(data[i].children, item, key)
                }
            }
        }
const getNameKey=(data)=>{
  for (let i = 0; i < data.length; i++) {

    nameKey.value.push({
    name: data[i].name,
    key: data[i].key,
    tag: data[i].tag
    });

    if (data[i].children && data[i].children.length > 0) {
       getNameKey(data[i].children)
    }
    }
  }
</script>
<style lang="scss" scoped>
.title {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.body {
  padding: 24px;
  height: calc(100vh - 148px);
  overflow: scroll;
}

.check {
  padding: 0 10px 24px 10px;
}

.page {
  padding: 16px;
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
  