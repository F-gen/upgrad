import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.timeout = 160000;
axios.defaults.baseURL = 'https://biuat.ibaiqiu.com/mi/';
export const login = (params) => {
  return axios.get(`/system/loginByFutail`, { params });
};

//新闻开始

/**查询新闻*/
export const queryNews = (params) => {
  return axios.post("/news/queryNews", params);
};

/**下载新闻*/
export const downloadNews = (params) => {
  return axios.post("/news/downloadNews", params, { responseType: "blob" });
};
export const querydata = (params) => {
  return axios.get(`/news/allConf`, { params });
};
//新闻结束

//权限Menu开始

export const insertMenu = (params) => {
  return axios.post(`/mi/menu/insert`, params);
};
export const updateMenu = (params) => {
  return axios.post(`/mi/menu/update`, params);
};

export const saveRoleKeyList = (params) => {
  return axios.post(`/mi/menu/saveRoleKeyList`, params);
};
export const getRoleKeyList = (params) => {
  return axios.get(`/mi/menu/getRoleKeyList`, { params });
};
// 根据角色获取menu
export const getMeunByRole = (params) => {
  return axios.get(`/mi/menu/selectByRole`, { params });
};
// 角色管理 - 查看当前所有角色信息列表
export const getRoleList = (params) => {
  return axios.get(`/role/manage/getRoleList`, { params });
};
export const getAllSupportConfiguration = (params) => {
  return axios.get(`/role/manage/getAllSupportConfiguration`, { params });
};
export const deleteRole = (params) => {
  return axios.get(`/role/manage/deleteRole`, { params });
};
export const insertRole = (params) => {
  return axios.post(`/role/manage/insertRole`, params);
};
export const updateRoleDetail = (params) => {
  return axios.post(`/role/manage/updateRoleDetail`, params);
};


//用户管理  
export const saveAuthorizationInfo = (params) => {
  return axios.post(`/user/roleInfo/manage/saveAuthorizationInfo`, params);
};
export const getUserRoleDetail = (params) => {
  return axios.get(`/user/roleInfo/manage/getUserRoleDetail`, { params });
};
export const getUserList = (params) => {
  return axios.post(`/user/roleInfo/manage/getUserList`, params);
};
export const getBrandListOfUserRole = (params) => {
  return axios.get(`/user/roleInfo/manage/getBrandListOfUserRole`, { params });
};
/**
 * @detail 查询token
 */
export const getFutailToken = (params) => {
  return axios.get(`/system/getFutailToken`, { params });
};

//查询品牌
export const queryAllBrand = (params) => {
  return axios.get(`/sys/brandfind/queryAllBrand`, { params });
};
export const queryAddShop = (params) => {
  return axios.get(`sys/brandfind/queryAddShop`, { params });
};
//品牌详情
export const queryBrandInfo = (params) => {
  return axios.post(`/sys/brandfind/queryBrandInfo`, params);
};

//品牌配置 页  查询类型
export const queryAllBrandType = (params) => {
  return axios.get(`bone/queryAllBrandType`, { params });
};
//品牌配置页  查询所有品牌名称
export const queryAllBrandName = (params) => {
  return axios.get(`bone/queryAllBrandName`, { params });
};
//查询/搜索所有品牌信息

export const queryBrand = (params) => {
  return axios.get(`bone/queryBrand`, { params });
};
//查询品牌 字母排序
export const queryBrandOrderAndGroup = (params) => {
  return axios.get(`bone/queryBrandOrderAndGroup`, { params });
};
//编辑
export const updBrand = (params) => {
  return axios.post(`bone/updBrand`, params);
};
//新增
export const insBrand = (params) => {
  return axios.post(`bone/insBrand`, params);
};
///删除
export const delBrand = (params) => {
  return axios.get(`bone/delBrand`, { params });
};
//行业配置页  查询所有行业名称
export const queryAllIndName = (params) => {
  return axios.get(`bone/queryAllIndName`, { params });
};
//行业配置页  查询行业信息
export const queryInd = (params) => {
  return axios.get(`bone/queryInd`, { params });
}; //编辑
export const updIndInfo = (params) => {
  return axios.post(`bone/updIndInfo`, params);
};
//新增
export const insIndInfo = (params) => {
  return axios.post(`bone/insIndInfo`, params);
};
///删除
export const delInd = (params) => {
  return axios.get(`bone/delInd`, { params });
};
// 采集词 关键词配置
//查看采集词信息
export const queryBrandKeyword = (params) => {
  return axios.get(`bone/queryBrandKeyword`, { params });
};
//编辑
export const updBrandKeyword = (params) => {
  return axios.post(`bone/updBrandKeyword`, params);
};
//新增
export const insBrandWord = (params) => {
  return axios.post(`bone/insBrandWord`, params);
};
///删除
export const delBrandKeyword = (params) => {
  return axios.get(`bone/delBrandKeyword`, { params });
};
//渠道配置页
//查询渠道信息
export const queryChannel = (params) => {
  return axios.get(`bone/queryChannel`, { params });
};
//编辑
export const updChannel = (params) => {
  return axios.post(`bone/updChannel`, params);
};
//新增
export const insChannel = (params) => {
  return axios.post(`bone/insChannel`, params);
};
///删除
export const delChannel = (params) => {
  return axios.get(`bone/delChannel`, { params });
};
//查看品牌渠道信息
export const queryBrandChannel = (params) => {
  return axios.post(`bone/queryBrandChannel`, params);
};
//修改品牌渠道信息
export const updBrandChannel = (params) => {
  return axios.get(`bone/updBrandChannel`, { params });
};
//平台配置页
//查询平台信息
export const queryPlatform = (params) => {
  return axios.get(`bone/queryPlatform`, { params });
};
//编辑
export const updPlatform = (params) => {
  return axios.post(`bone/updPlatform`, params);
};
//新增
export const insPlatform = (params) => {
  return axios.post(`bone/insPlatform`, params);
};
///删除
export const delPlatform = (params) => {
  return axios.get(`bone/delPlatform`, { params });
};
//查看 品牌-平台 信息
export const queryBrandPlatform = (params) => {
  return axios.post(`bone/queryBrandPlatform`, params);
};
//编辑
export const updBrandPlatform = (params) => {
  return axios.post(`bone/updBrandPlatform`, params);
};
//新增
export const insBrandPlatform = (params) => {
  return axios.post(`bone/insBrandPlatform`, params);
};
///删除
export const delBrandPlatform = (params) => {
  return axios.get(`bone/delBrandPlatform`, { params });
};
//品牌类型  与  报告类型
//查看
export const queryDict = (params) => {
  return axios.get(`bone/queryDict`, { params });
};
//新增
export const insDict = (params) => {
  return axios.post(`bone/insDict`, params);
};
//修改
export const updDict = (params) => {
  return axios.post(`bone/updDict`, params);
};
//删除
export const delDict = (params) => {
  return axios.post(`bone/delDict`, params);
};
export const downloadBrandKeyword = (params) => {
  return axios.post(`bone/downloadBrandKeyword`, params, {
    responseType: "blob",
  });
};
//主题 配置
//查看
export const queryTopic = (params) => {
  return axios.get(`bone/queryTopic`, { params });
};
//新增
export const insTopic = (params) => {
  return axios.post(`bone/insTopic`, params);
};
//修改
export const updTopic = (params) => {
  return axios.post(`bone/updTopic`, params);
};
//删除
export const delTopic = (params) => {
  return axios.get(`bone/delTopic`, { params });
};
//标签 配置
//查看
export const queryTag = (params) => {
  return axios.get(`bone/queryTag`, { params });
};
//新增
export const insTag = (params) => {
  return axios.post(`bone/insTag  `, params);
};
//修改
export const updTag = (params) => {
  return axios.post(`bone/updTag`, params);
};
//删除
export const delTag = (params) => {
  return axios.get(`bone/delTag`, { params });
};
// /过滤词 配置
//查看
export const queryFilter = (params) => {
  return axios.get(`bone/queryFilter`, { params });
};
//新增
export const insFilter = (params) => {
  return axios.post(`bone/insFilter`, params);
};
//修改
export const updFilter = (params) => {
  return axios.post(`bone/updFilter`, params);
};
//删除
export const delFilter = (params) => {
  return axios.get(`bone/delFilter`, { params });
};
//新增报告配置
//查看
export const queryNewReport = (params) => {
  return axios.get(`bone/queryNewReport`, { params });
};

//新增
export const insNewReport = (params) => {
  return axios.post(`bone/insNewReport`, params);
};
//修改
export const updNewReport = (params) => {
  return axios.post(`bone/updNewReport`, params);
};
//删除
export const delNewReport = (params) => {
  return axios.get(`bone/delNewReport`, { params });
};

//查看
export const queryReportResult = (params) => {
  return axios.get(`bone/queryReportResult`, { params });
};
//删除
export const delReportResult = (params) => {
  return axios.get(`bone/delReportResult`, { params });
};
// 下载
// export const downloadReport = (params) => {
//   return axios.get(`bone/downloadReport`, {params}, );
// };

//种草类初始数据————获取种草品牌
export const queryOriginalBrand = (params) => {
  return axios.get(`original/data/queryOriginalBrand`, { params });
};
//种草类初始数据————请求
export const planting = (params) => {
  return axios.post(`/original/data/planting`, params);
};
//种草类初始数据————导出
export const exportplanting = (params) => {
  return axios.post(`original/data/export`, params, {
    responseType: "blob",
  });
};
//种草动态表头
export const getDynamicHeader = (params) => {
  return axios.get(`original/data/getDynamicHeader`, { params });
};

// Data integellnce  
//Overview  comparechart 数据
export const Allvolumn = (params) => {
  return axios.post(`all/areas/data/global/volume/trend`, params);
};
// 查询内容与互动标签占比
export const tagproportion = (params) => {
  return axios.post(`content/topic/daily/proportion`, params);
};
// 根据传参查询关键词词云与关键词统计
export const keyword = (params) => {
  return axios.post(`keyword/daily/about/keyword`, params);
};
// 互动内容标签数量统计 
export const interactive = (params) => {
  return axios.post(`all/areas/data/statistics/interactive/content/topic`, params);
};
// 内容标签数量统计 
export const normal = (params) => {
  return axios.post(`all/areas/data/statistics/normal/content/topic`, params);
};
// 日计汇总
export const daysum = (params) => {
  return axios.post(`all/areas/data/global/report`, params);
};
//全域平台官号及KOLs发布量与声量占比
export const globalvolume = (params) => {
  return axios.post(`all/areas/data/global/volume/release`, params);
};
// 微博官号及KOLs声量趋势
export const weibotrend = (params) => {
  return axios.post(`weibo/daily/volume/trend`, params);
};
export const XHStrend = (params) => {
  return axios.post(`xhs/daily/volume/trend`, params);
};
export const douyintrend = (params) => {
  return axios.post(`douyin/daily/volume/trend`, params);
};
export const WECHATtrend = (params) => {
  return axios.post(`wechat/daily/volume/trend`, params);
};
// 导出互动内容标签数量统计
// /mi/all/areas/data/statistics/interactive/content/topic/export
export const exportinteractive = (params) => {
  return axios.post(`all/areas/data/statistics/interactive/content/topic/export`, params, {
    responseType: "blob",
  });
};
export const exportnormal = (params) => {
  return axios.post(`all/areas/data/statistics/normal/content/topic/export`, params, {
    responseType: "blob",
  });
};
// 导出 日计统计
export const exportdaysum = (params) => {
  return axios.post(`all/areas/data/export/report`, params, {
    responseType: "blob",
  });
};
export const topThirty = (params) => {
  return axios.post(`keyword/daily/about/keyword/topThirty`, params);
};
