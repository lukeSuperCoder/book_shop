<template>
  <div class="recommend">
      <template v-for="item in list.slice(0, 4)" :key="item.id">
        <div class="recommend-item">
            <a href="" @click.prevent="goD(item.id)">
                <img v-lazy="item.cover_url" alt="">
                <div>{{item.description}}</div>
            </a>
        </div>
      </template>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default {
    name: "RecommendView",
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    setup() {
        const router = useRouter();
        const goD = (id) => {
            router.push({path:'/detail', query:{id}})
        }
        return {goD}
    }
}
</script>

<style lang="scss">
.recommend {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 15px 0 30px;
    border-bottom: 8px solid #EEE;
    font-size: 12px;
}
.recommend-item {
    flex:1;
    img {
        width: 70px;
        height: 70px;
    }
}
</style>