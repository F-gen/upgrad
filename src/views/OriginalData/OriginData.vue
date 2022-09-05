<template>
  <div class="pageOrigin">
    <div class="search">
      <a-card>
        <div class="search_icon">
          <div>
            <a-form layout="inline">
              <a-form-item label="Brand name">
                <!-- @change="selectBrand" -->
                <a-select
                  v-model:value="selectbrandID"
                  style="width: 180px; height: 32px"
                  show-search
                  placeholder="全部品牌"
                  :filter-option="false"
                  @search="SearchBrand"
                  @blur="getBrandAgain"
                  showArrow
                >
                  <a-select-option
                    v-for="item in Branditems.result"
                    :key="item.brandId"
                    :value="item.brandId"
                  >
                    {{ item.brandNameEn }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Publish time">
                <a-range-picker
                  style="width: 200px; height: 32px"
                  :format="dateFormat"
                  @change="onChange"
                  :allowClear="false"
                  v-model:value="time"
                  :placeholder="['Start Time', 'End Time']"
                  :disabledDate="disabledDate"
                />
              </a-form-item>
              <a-form-item label="Data Source">
                <a-radio-group
                  v-model:value="dataSource"
                  @change="changeDataSource"
                  button-style="solid"
                >
                  <a-radio-button :value="1"> KOL/KOC发布 </a-radio-button>
                  <a-radio-button :value="0"> 官方发布 </a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item>
                <a-input
                  style="width: 180px; height: 32px"
                  v-model:value="searchdetail"
                  allowClear
                  placeholder="Search Content"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  style="margin-right: 8px; height: 32px"
                  @click="Search"
                >
                  Search
                </a-button>
                <a-button
                  html-type="submit"
                  @click="reset"
                  style="height: 32px"
                >
                  Reset
                </a-button>
              </a-form-item>
              <a-form-item> </a-form-item>
            </a-form>
          </div>
          <div class="righticon">
            <!-- v-has="'Social-btn-chart'" v-has="'Social-btn-export'" -->
            <div class="down" @click="toOverview">
              <a-tooltip placement="left" title="查看图表">
                <span class="iconfont icon-statistical"></span>
              </a-tooltip>
            </div>
            <div class="down" @click="download">
              <a-tooltip placement="left" title="一键下载">
                <span class="iconfont icon-download"></span>
              </a-tooltip>
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <div class="contetn">
      <a-card>
        <div class="download">
          <div>
            <a-radio-group
              button-style="solid"
              v-model:value="platform"
              @change="getOriginData"
            >
              <a-radio-button :value="1"> WeChat </a-radio-button>
              <a-radio-button :value="0"> Weibo </a-radio-button>

              <a-radio-button :value="3"> Xiaohongshu </a-radio-button>
              <a-radio-button :value="2"> Douyin </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        
    
        <!-- 分页 -->
        <div class="page">
          <a-pagination
            v-model="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            :show-total="
              (total, range) => `${range[0]}-${range[1]} of ${total} items`
            "
            show-size-changer
            show-less-items
            :page-size-options="page.pageSizeOptions"
            :default-current="page.page"
            @showSizeChange="onShowSizeChange"
            @change="onShowSizeChange"
          />
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import moment from "moment";
import { getBeforeDate, dynamicTableHead } from "@/utils/tool";

export default {
  name: "originData",
};
</script>

<script setup>
const route = useRoute();
const page = reactive({
  total: 0,
  page: 1,
  pageSize: 10,
  pageSizeOptions: ["10", "20", "30", "40", "50"],
});
const onShowSizeChange = (current, pageSize) => {
  page.page = current;
  page.pageSize = pageSize;
  Search();
};
// 品牌
const selectbrandID = ref(null);
const Branditems = ref([]);
const BackupBrandItems = ref([]);
const SearchBrand = (value) => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    Branditems.value = await api.queryOriginalBrand({
      brandName: value,
      needLimit: true,
    });
    clearTimeout(timer);
  }, 1000);
};
const getBrandAgain = () => {
  Branditems.value = BackupBrandItems.value;
};
// 日期
const dateFormat = ref("YYYY-MM-DD");
const time = ref([
  dayjs(getBeforeDate(33), dateFormat.value),
  dayjs(getBeforeDate(3), dateFormat.value),
]);
const disabledDate = (current) => {
  return (
    (current &&
      current > moment(new Date()).subtract(3, "days").endOf("days")) ||
    (current && current < new Date("2022-07-1"))
  );
};
// 时间change
const onChange = (date, dateString) => {
  page.page = 1;
  time.value = dateString;
};
//Data Source 及切换
const dataSource = ref(1);
const platform = ref(1);
const changeDataSource = () => {
  page.page = 1;
  getOriginData();
};

//Search Content
const searchdetail = ref(null);
// 按钮
const platformAllList = ref([]);
const columns = ref([]);
const data = ref([]);
const orderType = ref("all");
const order = ref(-1);
const Search = async () => {
  let datas = await api.planting({
    appType: platform.value,
    dataSource: dataSource.value,
    brandIdList: [selectbrandID.value].filter(Boolean),
    contentSearchWord: searchdetail.value,
    pageNum: page.page,
    pageSize: page.pageSize,
    orderType: orderType.value,
    order: order.value,
    endTime: dayjs(time.value[1]).format(dateFormat.value),
    startTime: dayjs(time.value[0]).format(dateFormat.value),
  });

  if (!datas.success) {
    message.warning(datas.message);
    return;
  }
  data.value = datas.result.list.list;
  page.total = datas.result.list.total;
};
const reset = () => {};

//动态表单 要改的东西
const changcolumWeibo = ref([
  {
    name: "brandName",
    key: "fixed",
    value: "left",
  },
  {
    name: "publishTime",
    key: "fixed",
    value: "left",
  },
  {
    name: "bodyLink",
    key: "scopedSlots",
    value: {
      customRender: "bodyLink",
    },
  },

  {
    name: "publisherLink",
    key: "scopedSlots",
    value: {
      customRender: "publisherLink",
    },
  },
  ,
  {
    name: "topicLink",
    key: "scopedSlots",
    value: {
      customRender: "topicLink",
    },
  },
]);
const changcolumWechat = ref([
  {
    name: "brandName",
    key: "fixed",
    value: "left",
  },
  {
    name: "publishTime",
    key: "fixed",
    value: "left",
  },

  {
    name: "opusUrl",
    key: "scopedSlots",
    value: {
      customRender: "opusUrl",
    },
  },
  {
    name: "videoUrl",
    key: "scopedSlots",
    value: {
      customRender: "videoUrl",
    },
  },
  {
    name: "audioUrl",
    key: "scopedSlots",
    value: {
      customRender: "audioUrl",
    },
  },
  {
    name: "musicUrl",
    key: "scopedSlots",
    value: {
      customRender: "musicUrl",
    },
  },
  {
    name: "originalFlag",
    key: "scopedSlots",
    value: {
      customRender: "originalFlag",
    },
  },
]);
const changcolumTiktok = ref([
  {
    name: "brandName",
    key: "fixed",
    value: "left",
  },
  {
    name: "publishTime",
    key: "fixed",
    value: "left",
  },

  {
    name: "opusUrl",
    key: "scopedSlots",
    value: {
      customRender: "opusUrl",
    },
  },

  {
    name: "topicList",
    key: "scopedSlots",
    value: {
      customRender: "topicList",
    },
  },
]);
const changcolumBook = ref([
  {
    name: "brandName",
    key: "fixed",
    value: "left",
  },
  {
    name: "publishTime",
    key: "fixed",
    value: "left",
  },

  {
    name: "opusUrl",
    key: "scopedSlots",
    value: {
      customRender: "opusUrl",
    },
  },

  {
    name: "topicList",
    key: "scopedSlots",
    value: {
      customRender: "topicList",
    },
  },
]);
// changeplatform
const downloadtitle = ref(""); //下载时用到platform
const getOriginData = () => {
  let num = platform.value;
  if (num == 0) {
    downloadtitle.value = "微博";
    getcolumn(changcolumWeibo.value);
  } else if (num == 1) {
    downloadtitle.value = "微信";
    getcolumn(changcolumWechat.value);
  } else if (num == 2) {
    downloadtitle.value = "抖音";
    getcolumn(changcolumTiktok.value);
  } else if (num == 3) {
    downloadtitle.value = "小红书";
    getcolumn(changcolumBook.value);
  }
  page.page = 1;
  Search();
};
const getcolumn = async (Array) => {
  const { result } = await api.getDynamicHeader({
    appType: platform.value,
    dataSource: dataSource.value,
  });
  columns.value = dynamicTableHead(result, Array);
  columns.value = result.map((item, index) => {
    item.title = item.title;
    item.dataIndex = item.column;
    item.key = index;

    item.width = 200;
    return item;
  });
};
const getDefaultBrand = async () => {
  Branditems.value = await api.queryOriginalBrand({
    brandName: "",
    needLimit: true,
  });
  selectbrandID.value = Branditems.value.result[0].brandId;
  getOriginData();
};
const getBaseData = async () => {
  Branditems.value = await api.queryOriginalBrand({
    brandName: "",
    needLimit: true,
  });
  BackupBrandItems.value = Branditems.value;
  platformAllList.value = await api.queryPlatform();

  if (route.params.selectbrandID) {
    selectbrandID = route.params.selectbrandID * 1;
    time = route.params.searchTime;
    platform = route.params.platform == "-1" ? 1 : route.params.platform * 1;
    getOriginData();
  } else {
    getDefaultBrand();
  }
};
getBaseData();
</script>

<style  scoped lang="scss">
.pageOrigin {
  padding: 16px;
  background-color: #f1f2f6;
  .nav {
    margin-top: 16px;
  }
  // 搜索和icon 左右分隔
  .search_icon {
    display: flex;
    justify-content: space-between;
  }
  // icon样式
  .righticon {
    cursor: pointer;
    display: flex;
    .down {
      font-size: 16px;
      margin-right: 16px;
      line-height: 40px;
    }
  }
  .contetn {
    margin-top: 16px;
    .download {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .page {
      margin-top: 16px;
      float: right;
    }
  }
}
</style>
