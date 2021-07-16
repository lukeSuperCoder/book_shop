<template>
  <div class="tab-control">
      <div 
        class="tab-control-item" 
        v-for="(item, index) in title" 
        :key="index"
        @click="itemClick(index)"
        :class="{active:index == curIndex}">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
import {ref} from "vue";
export default {
    name:"TabControl",
    props: {
        title: {
            type: Array,
            default(){
                return []
            }
        }
    },
    setup(props, context) {
        const curIndex = ref(0);
        const itemClick = (index) => {
            curIndex.value = index;
            context.emit('tabClick', index);
        }
        return {curIndex, itemClick}
    }
}
</script>

<style lang="scss">
    .tab-control {
        display: flex;
        height: 40px;
        line-height:40px;
        text-align: center;
        font-size: 14px;
        background-color: #ffffff;
        width: 100%;
        position: sticky;
        top: 44px;
        z-index: 10;
        .tab-control-item {
            flex:1;
            span {
                padding: 6px;
            }
        }
        .active {
            color: var(--color-tint);
            span {
                border-bottom: 3px solid var(--color-tint);
            }
        }
    }
</style>