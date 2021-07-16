import { createRouter, createWebHashHistory } from 'vue-router'
import { Notify } from "vant"
import store from '../store';
const Home = () => import('@/views/home/Home.vue');
const Category = () => import('@/views/category/Category.vue');
const Detail = () => import('@/views/detail/Detail.vue');
const Profile = () => import('@/views/profile/Profile.vue');
const ShopCart = () => import('@/views/shopcart/ShopCart.vue');
const Register = () => import('@/views/profile/Register.vue'); 
const Login = () => import('@/views/profile/Login.vue'); 
const Address = () => import('@/views/profile/Address.vue');
const EditAddress = () => import('@/views/profile/EditAddress.vue');
const CreateOrder = () => import('@/views/order/CreateOrder.vue');
const Order = () => import('@/views/order/Order.vue');
const OrderDetail = () => import('@/views/order/OrderDetail.vue');

const routes = [
    {
        path: '',
        name: 'DefaultHome',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {
            title: '图书兄弟-商品分类'
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '图书兄弟-商品详情'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '图书兄弟-个人中心',
            isAuthRequired: true
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {
            title: '图书兄弟-购物车',
            isAuthRequired: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '用户注册'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '用户登陆'
        }
    },
    {
        path: '/address',
        name: 'Address',
        component: Address,
        meta: {
            title: '地址管理',
            isAuthRequired: true
        }
    },
    {
        path: '/editaddress',
        name: 'EditAddress',
        component: EditAddress,
        meta: {
            title: '新增地址',
            isAuthRequired: true
        }
    },
    {
        path: '/createorder',
        name: 'CreateOrder',
        component: CreateOrder,
        meta: {
            title: '提交订单',
            isAuthRequired: true
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
            title: '我的订单',
            isAuthRequired: true
        }
    },
    {
        path: '/orderdetail',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: {
            title: '订单详情',
            isAuthRequired: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to,from,next) => {
    //如果没有登陆,在这里到login
    if(to.meta.isAuthRequired && store.state.user.isLogin === false) {
        Notify('您未登陆，请先登录')
        return next('/login')
    }
    store.dispatch('updateCart');
    next();
    //给页面设置标签
    document.title = to.meta.title;
})
export default router