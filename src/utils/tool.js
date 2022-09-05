
export function filterObjectEmpty(obj) {
  for (const i in obj) {
    if (obj[i] === null || obj[i] === undefined || obj[i] === "") {
      delete obj[i];
    }
  }
  return obj;
}
//请求添加参数
export function addRequestData(config, key, value) {
  let data = {};
  if (config.method == "get") {
    data = config.params || {};
    data[key] = value;
    config.params = data;
  } else {
    const url = config.url;
    if (url.indexOf("?") > -1) {
      config.url = `${config.url}&${key}=${value}`;
    } else {
      config.url = `${config.url}?${key}=${value}`;
    }
  }
}

//字符串截取,每三位加逗号
export const thousands = function (num) {
  // console.log(num)
  var n = Number(num);
  if (!isNaN(n)) {
    num = Math.floor(num * 100) / 100;
    var str = num.toString();
    var reg =
      str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
  } else {
    return num;
  }
};
//获取前n天日期
export const getBeforeDate = function (n) {
  const d = new Date();
  let year = d.getFullYear();
  let mon = d.getMonth() + 1;
  let day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();

  return (
    year +
    "-" +
    (mon < 10 ? "0" + mon : mon) +
    "-" +
    (day < 10 ? "0" + day : day)
  );
};
// //文件下载
//fileName 下载文件名
//blobType 文件类型
//fileData 流文件
export const downloadFile = function (
  { fileName, blobType, fileData } = {
    fileName: "excel.xlsx",
    fileData: "",
    blobType: "application/vnd.ms-excel",
  }
) {
  const blob = new Blob([fileData], { type: blobType }); //处理文档流
  const elink = document.createElement("a");
  elink.download = fileName;
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href);
  document.body.removeChild(elink);
};
//动态表头 修改内容所需  OriArray 后端的动态表头 ，colArray 为页面想要修改的列
export function dynamicTableHead(OriArray, colArray) {
  let newArray = [];
  newArray = OriArray.forEach((item) => {
    colArray.forEach((val) => {
      if (item.column == val.name) {
        item[val.key] = val.value;
      }
    });
  });
  return newArray;
}
