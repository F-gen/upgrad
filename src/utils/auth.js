/*
 * @Author: jack.hai
 * @Date: 2022-03-06 18:35:38
LastEditTime: 2022-08-25 17:00:22
 * @Description:
 */
const tokenObject = {
  token: "token",
  name: "name",
  stores: "stores",
  shopCode: "shopCode",
  userId: "userId",
  userInfo: "userInfo",
  userName: "userName",
  email: 'email',
  routes: 'routes',
  roleId: 'roleId',
  btnNameList: 'btnNameList'
};

export function getSession(key) {
  return sessionStorage.getItem(tokenObject[key]);
}

export function setSession(key, token) {
  return sessionStorage.setItem(tokenObject[key], token);
}

export function removeSession(key) {
  return sessionStorage.removeItem(tokenObject[key]);
}
// 处理baseRoute 与 角色菜单  生成动态路由
export function resoveDynRoute(Basic, roleRoute) {
  deepRouteResove(Basic, roleRoute)

  return Basic;
}
const newRout = []
function deepRouteResove(treeList, roleRoute) {
  // console.log(treeList,roleRoute,"deeproutter");
  roleRoute.forEach(routeName => {
    deleteTree(treeList[0].children, routeName)

  });

}
function deleteTree(treeList, routeName) {
  if (!treeList || !treeList.length) {
    return
  }
  for (let i = 0; i < treeList.length; i++) {

    if (treeList[i].meta.title == routeName) {

      treeList.splice(i, 1);
      break;
    }
    deleteTree(treeList[i].children, routeName)
  }
}
// 控制 按钮 显示

/**
 * 判断是否有权限。根据传入的权限标识，查看是否存在于用户的权限标识集合内。
 */
export function hasPermission(perms) {
  let hasPermission = true;
  let permission = store.getters.btnNameList
  for (let item of permission) {
    if (item === perms) {
      hasPermission = false;
      break;
    }
  }
  return hasPermission;
}
