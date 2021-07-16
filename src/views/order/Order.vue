<template>
    <nav-bar>
      <template v-slot:default>我的订单</template>
    </nav-bar>
    <van-tabs ref="activeRef" :model="active">
        <van-tab title="我的订单">
            <van-cell-group style="text-align: left;" v-for="item in list" :key="item.id" @click="getDetail(item.id)">
                <van-cell :title="user.email"  :value="item.order_no" :label="item.updated_at" />
            </van-cell-group>
        </van-tab>
        <van-tab title="物流状态">
            <div style="padding-top: 50px;">
                暂无物流信息
            </div>
        </van-tab>
        <van-tab title="售后详情">
            <div style="padding-top: 50px;">
                暂无售后信息
            </div>
        </van-tab>
        <van-tab title="我的评价">
            <div style="padding-top: 50px;">
                暂无评价信息
            </div>
        </van-tab>
    </van-tabs>
</template>

<script>
import { getOrderList, getOrderDetail } from "@/network/order.js";
import { getUser } from "@/network/register.js";
import NavBar from '@/components/common/navbar/NavBar.vue'
import { ref, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
    components: { NavBar },
    setup(props, context) {
        const active = ref('物流状态');
        const router = useRouter();
        const orderlist = reactive({
            list: [],
            user: {}
        })
        const getDetail =(id) => {
            router.push({path: '/orderdetail', query: {order_id: id}});
        }
        onMounted(() => {
            console.log(context);
            getUser().then(res => {
                orderlist.user = res;
            })
            getOrderList().then(res => {
                orderlist.list = res.data;
            })
        })
        return { ...toRefs(orderlist), getDetail, active }
    }
}
</script>

<style>

</style>