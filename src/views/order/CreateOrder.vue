<template>
  <nav-bar>
      <template v-slot:default>提交订单</template>
  </nav-bar>
  <van-contact-card type="edit" :name="address.name+'    电话: '+address.phone" :tel="address.province+address.city+address.county+address.address" :editable="false" />
  <van-card v-for="item in cartList" :key="item.id"
    :num="item.num"
    :price="item.goods.price+'.00'"
    :desc="item.created_at"
    :title="item.goods.title"
    :thumb="item.goods.cover_url"
  />
  <div class="submit">
      <van-submit-bar :price="total*100" button-text="提交订单" @submit="onSubmit(address.id)" />
  </div>
  <van-overlay :show="show">
    <div class="wrapper">
        <img width="200" height="200" :src="orderdetail.qr_code_url" alt="">
    </div>
    </van-overlay>
</template>

<script>
import { reactive, onMounted, toRefs, computed, ref } from "vue";
import { useRouter }  from 'vue-router';
import store from "../../store";
import { Toast } from "vant";
import NavBar from '@/components/common/navbar/NavBar.vue'
import { createOrder, getOrderPreview, payOrder } from "@/network/order.js";
export default {
    components: { NavBar },
    setup() {
        const show = ref(false);
        const router = useRouter();
        const state = reactive({
            cartList: [],
            address: {},
            orderdetail:{}
        })
        onMounted(() => {
            getOrderPreview().then(res => {
                state.cartList = res.carts;
                res.address.forEach(element => {
                    if(element.is_default==1){
                        state.address = element;
                    }
                });
                
                console.log(res);
            })
        })
        const total = computed(() => {
            let sum = 0;
            state.cartList.forEach(index => {
                    sum += parseInt(index.num) * parseFloat(index.goods.price);
                })
            return sum; 
        })
        const onSubmit =(id) => {
            console.log(id);
            createOrder({address_id: id}).then(res => {
                console.log(res);
                if (res) {
                    console.log(res);
                    Toast.success('提交成功');
                    store.dispatch('updateCart');
                    payOrder(res.id, {type: 'aliyun'}).then( res => {
                        console.log(res);
                        if(res.code === '10000') {
                             state.orderdetail = res;
                             show.value = true;
                             const timer = setTimeout(() => {
                                 Toast.success('支付成功');
                                 show.value = false;
                                 router.push({path:'/order'});
                             }, 5000)
                        }
                       
                    })
                }
            })
        }
        return { ...toRefs(state), total, onSubmit, show }
    }
}
</script>

<style>
.van-submit-bar {
    margin-bottom: 60px;
}
</style>