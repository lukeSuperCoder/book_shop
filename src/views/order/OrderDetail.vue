<template>
    <nav-bar>
      <template v-slot:default>我的订单</template>
    </nav-bar>
    <van-contact-card type="edit" :name="user.name+'    日期: '+user.updated_at" :tel="user.email" :editable="false" />
    <van-card v-for="item in cartList" :key="item.id"
        :num="item.num"
        :price="item.goods.price+'.00'"
        :desc="item.created_at"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
    />
</template>

<script>
import { getOrderDetail } from "@/network/order.js";
import NavBar from '@/components/common/navbar/NavBar.vue'
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
    components: { NavBar },
    setup() {
        const route = useRoute();
        const state = reactive({
            cartList:[],
            user: {}
        })
        onMounted(() => {
           getOrderDetail(route.query.order_id).then(res => {
               console.log(res);
               state.cartList = res.orderDetails.data;
               state.user = res.user;
           })
        })
        return { ...toRefs(state)  }
    }
}
</script>

<style>

</style>