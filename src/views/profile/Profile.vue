<template>
   <nav-bar>
      <template v-slot:default>我的</template>
    </nav-bar>
    <div style="margin-top: 50px; margin-bottom:80px;">
      <div style="text-align: center;">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          :src="user.avatar_url"
        />
        <div>
          <van-cell-group style="text-align: left;">
            <van-cell title="昵称" :value="user.name" />
            <van-cell title="用户名" :value="user.email"/>
            <van-cell title="我的订单" is-link to="/order" />
            <van-cell title="地址管理" is-link to="/address" />
          </van-cell-group>

        </div>
      </div>
    </div>
    <van-button round block type="primary" @click="logOut">退出登陆</van-button>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { LogOut, getUser } from '@/network/register';
import { useRouter } from "vue-router";
import { onMounted, reactive, toRefs } from "vue";
import store from '../../store';
import {Toast} from "vant";
export default {
  components: { NavBar },
  setup() {
    const state = reactive({
      user: {}
    });
    const router = useRouter();
    const logOut =() => {
      LogOut().then(res => {
        console.log(res);
        if(res.status == '204') {
          Toast.success("退出成功");
          window.localStorage.setItem('token', '');
          store.commit('setIsLogin', false);
          router.push({path: '/login'});
        }
      })
    }
    const getUserMessage =() => {
      getUser().then(res => {
        console.log(res);
        state.user = res;
      })
    }
    onMounted(() => {
      getUserMessage();
    })
    return { logOut, getUserMessage, ...toRefs(state) }
  }
}
</script>

<style>

</style>