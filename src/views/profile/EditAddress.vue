<template>
    <nav-bar>
      <template v-slot:default>新增地址</template>
    </nav-bar>
  <van-address-edit
    :area-list="areaList"
    show-postal
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
   />
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { areaList } from '@vant/area-data';
import { Toast } from "vant";
import { addAddress, editAddress, deleteAddress, getAddress } from "@/network/address.js";
export default {
    components: { NavBar },
    setup() {
        const router = useRouter();
        const state = reactive({
            areaList: {
                province_list: {},
                city_list: {},
                county_list: {}
            },
            searchResult: [],
            addressInfo: {}
        })
        const onSave =(value) =>{
            console.log(value);
            let data = {
                name: value.name,
                address: value.addressDetail,
                phone: value.tel,
                province: value.province,
                city: value.city,
                county: value.county,
                is_default: value.isDefault?1:''
            }
            addAddress(data).then(res => {
                if (res.status === 201) {
                    Toast.success('地址新增成功');
                    router.go(-1);
                } else {
                    Toast.console.error('地址新增失败');
                }
            })
            Toast('save');
        };
        const onDelete =() =>{
            Toast('delete');
        };
        const onChangeDetail =(val) =>{
            if (val) {
                state.searchResult = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                state.searchResult = [];
            }
        }
        onMounted(() => {
            state.areaList = areaList;
        })
     return { ...toRefs(state), onSave, onDelete, onChangeDetail }
    }
}
</script>

<style>

</style>