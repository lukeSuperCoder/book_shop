<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户登陆</template>
    </nav-bar>
    <div style="margin-top: 50px;">
      <div style="text-align: center;">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <van-form @submit="onSubmit">
          <van-field
            v-model="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '邮箱' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import { Toast } from 'vant';
import { reactive, toRefs } from "vue";
import { LoginUser } from "@/network/register";
import { useRouter } from "vue-router";
import store from '../../store';
export default {
    name:"Login",
    components: { NavBar },
    setup() {
      const router = useRouter();
      const form = reactive({
        email: '',
        password: ''
      })
      const onSubmit =() => {
        LoginUser(form).then(res => {
          console.log(res);
          window.localStorage.setItem('token', res.access_token);
          store.commit('setIsLogin', true)
          Toast.success("登陆成功！")
          form.email = '';
          form.password = '';
          router.go(-1); 
        })
      }
      return {...toRefs(form), onSubmit}
    }
}
</script>

<style>

</style>