<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
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
            v-model="name"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="password_confirmation"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请再次输入正确密码' }]"
          />
          <van-field
            v-model="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <div style="margin: 16px;">
            <router-link class="link-login" to="/login">已有账号，立即登陆</router-link>
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
import { RegisterUser } from "@/network/register";
import { useRouter } from "vue-router";
export default {
    name:"Register",
    components: { NavBar },
    setup() {
      const router = useRouter();
      const form = reactive({
        name: '',
        password: '',
        password_confirmation: '',
        email: ''
      })
      const onSubmit =() => {
        console.log(form);
        RegisterUser(form).then(res => {
          console.log(res);
          if(res.status==201) {
            Toast.success('注册成功！');
            router.push({path: '/login'});
          }else {
            Toast.error('注册失败')
          }
        })
      }
      return {...toRefs(form), onSubmit}
    }
}
</script>

<style>
.link-login{
  font-size: 14px;
  color: blue;
}
</style>