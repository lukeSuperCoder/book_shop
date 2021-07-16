<template>
  <h1>HelloWorld</h1>
  <li v-for="item in banner" :key="item.id">
    <ul>{{item.title}}</ul>
  </li>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getHomeAllData } from '@/network/home.js';
export default {
  name: 'HelloWorld',
  setup() {
    const banner = ref([]);
    onMounted(() => {
      getHomeAllData().then(res => {
        console.log(res);
        banner.value = res.slides;
      })
    })
    return { banner }
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
