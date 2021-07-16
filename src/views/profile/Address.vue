<template>
    <nav-bar>
      <template v-slot:default>地址管理</template>
    </nav-bar>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
     />
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { reactive, toRefs, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import {  editAddress, deleteAddress, getAddress } from "@/network/address.js";
export default {
    components: { NavBar },
    setup() {
        const router = useRouter();
        var chosenAddressId = ref(0);
        const state = reactive({
            list: []
        })
        const getAdd =() => {
            getAddress().then(res => {
                res.data.forEach(i => {
                    i.tel = i.phone;
                    i.addressDetail = i.address;
                    if(i.is_default==1){
                        chosenAddressId.value = i.id;
                    }
                });
                state.list = res.data;
            })
        };
        onMounted(() => {
            getAdd();
        })
        const onAdd =() =>{
            router.push({path:'/editaddress'})
        };
        const onEdit =(item) =>{
            Dialog.confirm({
                title: '删除地址',
                message: '是否删除该地址？',
                })
                .then(() => {
                    // on confirm
                    deleteAddress(item.id).then(res => {
                        if(res.status === 204) {
                            Toast.success('删除成功');
                            getAdd();
                        } else {
                            Toast.success('删除失败');
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                    Toast.console.error('已取消删除');
            });
        };
        const onSelect =(item) => {
            const data = {
                name:item.name,
                address:item.address,
                phone:item.phone,
                province:item.province,
                city:item.city,
                county:item.county,
                is_default:1
            };
            editAddress(item.id, data).then(res => {
                if(res.status === 204) {
                    Toast.success('已设置为默认收货地址');
                }
            })
        }
        return { ...toRefs(state), onAdd, onEdit, getAdd, onSelect, chosenAddressId }
    }
}
</script>

<style>
.van-address-list__bottom {
    margin-bottom: 60px;
}
</style>