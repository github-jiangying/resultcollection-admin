import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {store} from '.././store'
import {Msg} from '.././tools/message';

NProgress.configure({showSpinner: false}); // NProgress Configuration


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: () => import('../components/container/container.vue'),
      children: [
        {
          path: '/adminHome',
          name: 'adminHome',
          component: () => import('../view/admin/home/index.vue'),
          meta: {
            requireAuth: true
          },
        }
        , {
          path: '/clientHome',
          name: 'clientHome',
          component: () => import('../view/client/home/index.vue'),
          meta: {
            requireAuth: true
          },
        }
        , {
          path: '/personal',
          name: 'personal',
          component: () => import('../view/client/personal/personal.vue'),
          meta: {
            requireAuth: true
          },
        }
        , {
          path: '/resultDetails',
          name: 'resultDetails',
          component: () => import('../view/client/resultDetails/resultDetails.vue'),
          meta: {
            requireAuth: true
          },
        }
        , {
          path: '/entryInfo',
          name: 'entryInfo',
          component: () => import('../view/client/entryInfo/entryInfo.vue'),
          meta: {
            requireAuth: true
          },
        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login/login.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../view/login/login.vue')
    }
    ,
    {
      path: '/404',
      name: '404',
      component: () => import('../components/errorPage/404.vue')
    },
    {
      path: '*',
      name: 'err',
      redirect: '404',
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
//     /** 判断用户是否已经登录 */
//     const {isLogin,token} = store.getters;
//
//     if (isLogin) { // 判断当前的user_id是否存在 ； 登录存入的user_id
//       next();
//     }
//     else {
//       next({
//         path: '/login',
//         // query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
//       })
//       Msg.error('检测到您当前未登录，请先登录');
//     }
//   }
//   else {
//     next();
//     Msg.error('检测到您当前未登录，请先登录');
//   }
// })

router.afterEach(() => {
  NProgress.done()
});

export default router
