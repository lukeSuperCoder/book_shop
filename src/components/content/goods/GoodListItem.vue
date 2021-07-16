<template>
    <div class="goods-item" @click="itemClick">
        <img :src="product.cover_url" alt="">
        <div class="goods-info">
            <p>{{product.title}}</p>
            <span class="price"><small>$</small>{{product.price}}</span>
            <span class="collect">{{product.collects_count}}</span>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    name:"GoodListItem",
    props: {
        product: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    setup(props,) {
        const router = useRouter();
        return {
            itemClick:() => {
                router.push({path:'/detail', query:{id: props.product.id}})
            }
        }
    }
}
</script>

<style lang="scss">
.goods-item {
    width: 45%;
    padding-bottom: 40px;
    position: relative;
    img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left:0px;
        right: 0px;
        overflow: hidden;
        p {
            overflow: hidden;
            text-overflow: nowrap;
            margin-bottom: 3px;
        }
        .price {
            color: red;
            margin-right: 20px;
        }
        .collect {
            position: relative;
        }
        .collect::before {
            content: '';
            position: absolute;
            left: -15px;
            width: 14px;
            height: 14px;
            background: url('@/assets/images/collect.png') 0 0/13px 13px;
        }
    }
}
</style>