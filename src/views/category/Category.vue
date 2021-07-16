<template>
     <div>
        <nav-bar>
          <template v-slot:default>分类页面</template>
        </nav-bar>
        <div id="mainbox">
          <div class="ordertab">
            <van-tabs v-model="active" @click="tabClick">
              <van-tab title="销量排序"></van-tab>
              <van-tab title="价格排序"></van-tab>
              <van-tab title="评价排序"></van-tab>
            </van-tabs>
          </div>
            <van-sidebar class="leftmenu" v-model="activeKey">
              <van-collapse v-model="activeName" accordion>
                  <van-collapse-item
                    v-for="item in category_list"
                    :key="item.id"
                    :title="item.name"
                  >
                      <van-sidebar-item
                        v-for="item_child in item.children"
                        :key="item_child.id"
                        :title="item_child.name"
                        @click="getGoods(item_child.id)"
                      />
                  </van-collapse-item>
              </van-collapse>
            </van-sidebar>
          <div ref="banref" class="goodslist">
            <div class="wrapper">
              <div class="content">
                  <van-card
                    @click="itemClick(item.id)"
                    v-for="item in showGoods" :key="item.id"
                    :num="item.collects_count"
                    :price="item.price"
                    :desc="item.updated_at.slice(0,10)"
                    :title="item.title"
                    :thumb="item.cover_url"
                  />
              </div>
            </div>
          </div>
          <back-top @bTop="bTop" v-show="isTabFixed"></back-top>
        </div>
     </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getCategory, getCategoryGoods } from "@/network/category";
import BackTop from "@/components/common/backtop/BackTop.vue";
import BScroll from 'better-scroll';
export default {
  name: "Category",
  components: { NavBar, BackTop },
  setup() {
    const activeKey = ref(1);
    const activeName = ref('1')
    const active = ref(0);
    const category_list = ref([]);
    let isTabFixed = ref(false);
    let banref = ref(null);
    //下拉滚动条
    let bscroll = reactive({});
    //当前排序条件
    let curOrder = ref('sales');
    const curId = ref(0);
    const router = useRouter();
    //数据模型
    const goods = reactive({
      sales: {page:1, list:[]},
      price: {page:1, list:[]},
      comments_count: {page:1, list:[]}
    })
    const showGoods = computed(() => {
      return goods[curOrder.value].list;
    })
    const init = () => {
      getCategoryGoods('sales', curId.value).then(res => {
        goods.sales.list = res.goods.data;
      })
      getCategoryGoods('price', curId.value).then(res => {
        goods.price.list = res.goods.data;
      })
      getCategoryGoods('comments_count', curId.value).then(res => {
        goods.comments_count.list = res.goods.data;
      })
    }
    onMounted(() => {
      //获取菜单
      getCategory().then(res => {
        // console.log(res)
        category_list.value = res.categories;
      })
      getCategoryGoods('sales', curId.value).then(res => {
        goods.sales.list = res.goods.data;
      })
      //创建滚动元素
      let wrapper = document.querySelector('.wrapper')
      bscroll = new BScroll(wrapper, {
        probeType: 3,
        click: true,
        pullUpLoad: true  //上拉加载更多 default:false
      })
      //触发滚动事件
      bscroll.on('scroll', (position) => {
        //判断当页面滚动到一定高度将顶部标签选项卡展示
        // console.log(position);
        isTabFixed.value = (-position.y) > banref.value.offsetHeight;
      })
      //上拉加载数据
      bscroll.on('pullingUp', () => {
        const page = goods[curOrder.value].page+1;
        getCategoryGoods(curOrder.value, curId.value, page).then(res => {
          goods[curOrder.value].list.push(...res.goods.data);
          goods[curOrder.value].page += 1;
        })
        //数据加载完成之后需要让插件展示出来
        bscroll.finishPullUp();
        console.log('页数',goods[curOrder.value].page,'类型',curOrder.value);
        bscroll.refresh();
      })
    })
    //监听只要数据有变化就加载数据
    watchEffect(() => {
      nextTick(() => {
          bscroll && bscroll.refresh();
      })
    })
    const bTop =() => {
      bscroll.scrollTo(0, 0, 500);
    }
    //排序选项卡
    const tabClick =(index) => {
      console.log(index);
      let orders = ['sales', 'price', 'comments_count']
      curOrder.value = orders[index];
      getCategoryGoods(curOrder.value, curId.value).then(res => {
        goods[curOrder.value].list = res.goods.data;
      })
    }
    //通过点击类型获取商品
    const getGoods =(id) => {
      curId.value = id;
      init();
    }
    return { activeKey, category_list, activeName, active, tabClick, curOrder, curId, getGoods, showGoods, goods, init, bscroll, bTop, isTabFixed, banref, 
    itemClick:(id) => {
      router.push({path:'/detail', query:{id}})
    }}
  }
}
</script>

<style lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    height: 50px;
    flex: 1;
    float: right;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }

  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
    height: 500px;
  }

  .goodslist {
    flex: 1;
    position: absolute;
    top: 50px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left;
  }
  .wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
}
</style>