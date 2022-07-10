import axios from "axios";
import { Toast } from 'vant';
import Vue from "vue";

Vue.use(Toast);
var baseURL = "";
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://shop.bufantec.com';
} else {
    baseURL = 'http://shop.bufantec.com';
}

const instance = axios.create({
    baseURL,
    timeout: 5000
});


var toast=null;
// Toast.allowMultiple();
instance.interceptors.request.use(config => {
    if(!toast){
        toast = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
    }else{
        toast.clear()
        toast = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
    }
        
   
   
    if (config.method.toLowerCase() == 'get')
        config.params = config.data;
    return config;
}, err => {
    toast.clear();
    return Promise.reject(err);
})

//响应拦截器
instance.interceptors.response.use(res => {
    toast.clear({
        clearAll:true
    });
    return res.data;
}, err => {
    toast.clear();
    return Promise.reject(err);
})



// 请求拦截器
// instance.interceptors.request.use(config => {
//     if(!toast){
//         toast = Toast.loading({
//             message: '加载中...',
//             forbidClick: true,
//             duration: 0
//         });
//     }else{
//         toast.clear()
//     }
   
//     if (config.method.toLowerCase() == 'get')
//         config.params = config.data;
//     return config;
// }, err => {
//     toast.clear();
//     return Promise.reject(err);
// })

// //响应拦截器
// instance.interceptors.response.use(res => {
//     toast.clear();
//     return res.data;
// }, err => {
//     toast.clear();
//     return Promise.reject(err);
// })

export default instance;