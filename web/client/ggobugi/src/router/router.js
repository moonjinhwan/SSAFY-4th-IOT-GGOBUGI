import Vue from 'vue'
import Router from 'vue-router'

// 연결할 컴포넌트 import
import MyDevice from "@/components/MyDevice.vue"
import Status from "@/components/Status.vue"
import Security from "@/components/Security.vue"

// 필수
Vue.use(Router)

export default new Router({
    mode: 'history', // history 모드는 자연스러운 url 가능, 지정하지 않으면 해시(#)기호로 url 사용
    routes: [
        {
            path: "/", // 경로
            name: "Home", 
            component: Status
        },
        {
            path: "/status", // 경로
            name: "Status", // 해당 경로의 이름 
            component: Status // 이동할 컴포넌트
        },
        {
            path: "/my-device",
            name: "MyDevice",
            component: MyDevice
        },
        {
            path: "/security",
            name: "Security",
            component: Security
        },

    ]
})