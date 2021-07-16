<template>
    <div>
        <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in banners" :key="index">
                <img v-lazy="item.img_url" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name:"HomeSwiper",
    props: {
        banners: {
            type: Array,
            default(){
                return []
            } 
        }
    },
    setup() {
        let image = ref(['@/assets/images/Welcome.jpg']);
        return {image}
    }
}
</script>

<style>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 10px;
    text-align: center;
    background-color: #39a9ed;
}
img {
    width: 100%;
    height: auto;
}
</style>