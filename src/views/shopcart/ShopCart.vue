<template>
   <nav-bar>
      <template v-slot:default>购物车</template>
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body" v-for="item in cart_list" :key="item.id">
        <van-checkbox-group ref='checkboxGroup' v-model="result" @change="groupChange">
          <van-swipe-cell :right-width="50">
            <div class="good-item">
              <van-checkbox :name="item.id"></van-checkbox>
              <van-card
                class="good-message"
                :price="item.goods.price+'.00'"
                :desc="item.goods.description"
                :title="item.goods.title"
                :thumb="item.goods.cover_url"
              />
              <van-stepper class="stepper" integer :min="1" :max="item.goods.stock" :model-value="item.num" :name="item.id" async-change @change="onChangeCount"></van-stepper>
            </div>
            <template #right>
              <van-button square type="danger" style="height:100%;" text="删除" @click="deleteGood(item.id)"/>
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <br><br><br><br><br><br>
      <van-submit-bar class="submit-all" :price="total*100" button-text="提交订单" @submit="onSubmit">
          <van-checkbox @click="allCheck" v-model:checked="checkall">全选</van-checkbox>
      </van-submit-bar>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../../store";
import { getCart, modifyCart, checkedCart, deleteCartItem } from "@/network/cart.js";
import { Toast } from 'vant';
export default {
  components: { NavBar },
  setup() {
    const list = reactive({
      cart_list: [],
      result: [],
      checkall: false
    })
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      getCart('include=goods').then(res => {
        list.cart_list = res.data;
        list.result = res.data.filter((n)=> n.is_checked ==1).map(item => item.id);
      })
    })
    const onSubmit =() => {
      if(list.result.length==0){
        Toast.fail('请先选择商品')
      }else {
        router.push({path:'/createorder'});
      }
    }
    const onChangeCount =(value, detail) => {
       modifyCart(detail.name, {num: value}).then(res => {
         console.log(res);
         list.cart_list.forEach(element => {
           if(element.id == detail.name) {
             element.num = value;
           }
         });
       })
    }
    const groupChange = (result) => {
      if(list.cart_list.length == result.length) {
        list.checkall = true;
      } else {
        list.checkall = false;
      }
      list.result = result;
      checkedCart({cart_ids: result});
    }
    const allCheck =() => {
      if(!list.checkall){
        list.result = list.cart_list.map(item => item.id);
        list.checkall = true;
      }else {
        list.result = [];
        list.checkall = false;
      }
    }
    const deleteGood =(id) => {
      deleteCartItem(id).then(res => {
        getCart('include=goods').then(res => {
          list.cart_list = res.data;
          list.result = res.data.filter((n)=> n.is_checked ==1).map(item => item.id);
          store.dispatch('updateCart');
        })
      })
    }
    const total = computed(() => {
      let sum = 0;
      list.cart_list.filter(item => list.result.includes(item.id))
        .forEach(index => {
          sum += parseInt(index.num) * parseFloat(index.goods.price);
        })
      return sum;
    })
    return { ...toRefs(list), onSubmit, onChangeCount, groupChange, allCheck, deleteGood, total }
  }
}
</script>

<style lang="scss">
.cart-box{
  .cart-body {
     .good-item {
       display: flex;
       .good-message {
         width: 80%;
       }
       .stepper {
         width: 15%;
         padding-top: 15px;
         margin-top: 5px;
       }
     }
  }
  .submit-all{
    margin-bottom: 60px;
  }
  
}

</style>