<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>首页</template>
    </nav-bar>
    <tab-control v-show="isTabFixed" @tabClick="tabClick" :title="['畅销','新书','精选']"></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="banref" class="banners">
          <home-swiper :banners="banners"></home-swiper>
        </div>
        <recommend-view :list="book_list"></recommend-view>
        <tab-control @tabClick="tabClick" :title="['畅销','新书','精选']"></tab-control>
        <good-list :goods="showGoods"></good-list>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isTabFixed"></back-top>
  </div>

</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import RecommendView from "./ChildComps/RecommendView.vue";
import HomeSwiper from "./ChildComps/HomeSwiper.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import BackTop from "@/components/common/backtop/BackTop.vue";
import GoodList from "@/components/content/goods/GoodList.vue";
import { getHomeAllData, getHomeGoods } from "@/network/home.js";
import { onMounted, ref, reactive, computed, watch, nextTick, watchEffect } from "vue";
import BScroll from 'better-scroll';
export default {
  components: { NavBar, RecommendView, TabControl, GoodList, BackTop, HomeSwiper},
  name: "Home",
  setup() {
    const book_list = ref([]);
    const goods = reactive({
      sales:{
        list:[],
        page:1
      },
      recommend:{
        list:[],
        page:1
      },
      new:{
        list:[],
        page:1
      }
    })
    let curType = ref('sales');
    const showGoods = computed(() => {
      return goods[curType.value].list;
    })
    let bscroll = reactive({});
    let isTabFixed = ref(false);
    let banref = ref(null);
    let banners = ref([]);
    onMounted(() => {
      getHomeAllData().then(res => {
        if(res) {
          // console.log(res.goods);
          book_list.value = res.goods.data;
          banners.value = res.slides;
        }
      })
      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods.data;
      })
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data;
      })
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data;
      })
      console.log(goods);
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
        isTabFixed.value = (-position.y-150) > banref.value.offsetHeight;
      })
      //上拉加载数据
      bscroll.on('pullingUp', () => {
        const page = goods[curType.value].page+1;
        getHomeGoods(curType.value, page).then(res => {
          goods[curType.value].list.push(...res.goods.data);
          goods[curType.value].page += 1;
        })
        //数据加载完成之后需要让插件展示出来
        bscroll.finishPullUp();
        console.log('页数',goods[curType.value].page,'类型',curType.value);
        bscroll.refresh();
      })
    })
    const tabClick = (index) => {
      let types = ['sales', 'new', 'recommend'];
      curType.value = types[index];
      nextTick(() => {
          bscroll && bscroll.refresh();
      })
    }
    //监听只要数据有变化就加载数据
    watchEffect(() => {
      nextTick(() => {
          bscroll && bscroll.refresh();
      })
    })

    const bTop =() => {
      bscroll.scrollTo(0, 0, 500);
    }
    return { book_list, tabClick, goods, showGoods, bscroll, isTabFixed, banref, bTop, banners }
  }
}
</script>

<style>
#home {
  top: -60px;
  height: 100vh;
  position: relative;
}
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
</style>