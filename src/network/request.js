import axios from "axios";
import { Notify, Toast } from "vant";
import router from "../router";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 50000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才可以访问，就在这里统一设置
        const token = window.localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = 'Bearer '+token;
        }
        //直接放行
        return config;
    }, err =>{

    })

    //响应拦截
    instance.interceptors.response.use( res => {
        return res.data ? res.data: res;
    }, err => {
        //如果有需要授权才可以访问的接口，统一去login授权
        if(err.response.status == '401') {
            Toast.fail('请先登陆');
            router.push({path: '/login'});
        }
        //如果有错误，这里会处理 
        Notify(err.response.data.errors.num[0]);
        Notify(err.response.data.errors[Object.response.data.errors])
    })
    return instance(config);
}