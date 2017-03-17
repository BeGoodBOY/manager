import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import home from '@/pages/home'
import TimeEntries from '@/components/TimeEntries'
import LogTime from '@/components/LogTime'
import login from '@/pages/login'
import register from '@/pages/register'
import resetPwd from '@/pages/resetPwd'
import rechargeCard from '@/pages/rechargeCard'
import buyCard from '@/pages/buyCard'
import buyCardPage from '@/pages/buyCardPage'
import myMsg from '@/pages/myMsg'
import cardDetail from '@/pages/cardDetail'
import myPromoter from '@/pages/myPromoter'
import addPromoter from '@/pages/addPromoter'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/register',
      name: 'register',
      component: register
    },
    {
      path:'/reset-pwd',
      name: 'resetPwd',
      component: resetPwd
    },
    {
      path:'/home',
      name: '',
      component: home,
      children : [
        {
          path:'',
          name: 'home',
          component: rechargeCard,
        },
        {
          path: 'my-promoter',
          name: 'myPromoter',
          component: myPromoter
        },
        {
          path: 'add-promoter',
          name: 'addPromoter',
          component: addPromoter
        },
        {
          path: 'my-msg',
          name: 'myMsg',
          component: myMsg
        },
        {
          path: 'recharge-card',
          name: 'rechargeCard',
          component: rechargeCard
        },
        {
          path: 'card-detail',
          name: 'cardDetail',
          component: cardDetail
        },
        {
          path: 'buy-card',
          name: 'buyCard',
          component: buyCard
        }
      ]
    },
    {
      path:'/buy-card-page',
      name: 'buyCardPage',
      component: buyCardPage
    },
    {
    	path: '/time-entries',
    	component: TimeEntries,
    	children : [{
    		path : 'log-time',
    		// 懒加载
    		component : resolve => require(['@/components/LogTime.vue'],resolve),
  		}]
    }
  ]
})
