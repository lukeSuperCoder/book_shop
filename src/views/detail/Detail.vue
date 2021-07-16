<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情:{{id}}</template>
    </nav-bar>
    <van-image
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price+'.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">{{detail.is_on==0?'不上架':'上架'}}</van-tag>
        <van-tag plain type="danger">{{detail.is_recommend==0?'不推荐':'推荐'}}</van-tag>
      </template>
      <template #footer>
        <van-button size="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button size="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>   
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <div class="content" v-html="detail.details" >
        </div>
      </van-tab>
      <van-tab title="标签 2">
        <div v-for="item in comments" :key="item.id" style="text-align: left;padding-left: 20px;">
          <van-image
            width="50"
            height="50"
            :src="item.user.avatar_url"
          />
          <van-rate v-model="item.rate" /><br>
          <span>{{item.content}}</span><br>
          <span>{{item.created_at}}</span><br><br><br><br><br>
        </div>
      </van-tab>
      <van-tab title="标签 3">
        <good-list :goods="like_goods"></good-list>
      </van-tab>
    </van-tabs>      
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import GoodList from "@/components/content/goods/GoodList.vue";
import { getDetail } from '@/network/detail.js';
import {useRoute, useRouter} from "vue-router";
import { Toast } from "vant";
import store from "../../store";
import { addCart } from "@/network/cart.js";
import { ref, onMounted, reactive, toRefs } from "vue";
export default {
  components: { NavBar, GoodList },
  setup() {
    const active = ref(1);
    const route = useRoute();
    const router = useRouter();
    let id = ref(0);
    let book = reactive({
      detail: {},
      like_goods:[],
      comments:[]
    })
    onMounted(() => {
      id.value = route.query.id;
      getDetail(id.value).then(res => {
        console.log(res);
        book.detail = res.goods;
        book.comments = res.goods.comments;
        book.like_goods = res.like_goods;
      })
    })
    //添加购物车
    const handleAddCart = () => {
      addCart({goods_id: book.detail.id, num:1}).then(res => {
        if(res.status === 204 || res.status === 201) {
          Toast.success('添加成功');
          store.dispatch('updateCart');
        }
      })
    }
    //立即购买
    const goToCart = () => {
      addCart({goods_id: book.detail.id, num:1}).then(res => {
        if(res.status === 204 || res.status === 201) {
          Toast.success('添加成功');
          store.dispatch('updateCart');
          router.push({path: '/shopcart'});
        }else {
           Toast.error(res.message);
        }
      }).error(res => {
         Toast.error(res.message);
      });
    }
    return { id, ...toRefs(book), active, handleAddCart, goToCart}
  }
}
</script>

<style lang="scss">
.content {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>