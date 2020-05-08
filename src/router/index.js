import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    meta: {
      title: '登录',
      index: 0
    },
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/user/register',
    meta: {
      title: '注册',
      index: 1
    },
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/home',
    meta: {
      title: '主页',
      index: 1
    },
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/user/center',
    meta: {
      title: '个人中心',
      index: 2
    },
    component: () => import('../views/Center/Center.vue')
  },
  {
    path: '/user/edit',
    meta: {
      title: '修改资料',
      index: 3
    },
    component: () => import('../views/EditUser/EditUser.vue')
  },
  {
    path: '/askquestion',
    meta: {
      title: '创建问题',
      index: 3
    },
    component: () => import('../views/CreateQ/CreateQ.vue')
  },
  {
    path: '/answerbox/:boxid',
    meta: {
      title: '回答问题箱',
      index: 4
    },
    component: () => import('../views/AnswerBox/AnswerBox.vue')
  },
  {
    path: '/answerlist',
    meta: {
      title: '我的回答',
      index: 3
    },
    component: () => import('../views/MyAnswer/MyAnswer.vue')
  },
  {
    path: '/myask',
    meta: {
      title: '我的提问',
      index: 3
    },
    component: () => import('../views/MyAsk/MyAsk.vue')
  },
  {
    path: '/showbox/:boxid/:title',
    meta: {
      title: '查看问题箱',
      index: 4
    },
    component: () => import('../views/ShowBox/ShowBox.vue')
  },
  {
    path: '/showask/:askid',
    meta: {
      title: '查看问题',
      index: 4
    },
    component: () => import('../views/ShowAsk/ShowAsk.vue')
  },
  {
    path: '/checkuser/:username',
    meta: {
      title: '查看用户',
      index: 4
    },
    component: () => import('../views/CheckUser/CheckUser.vue')
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if (localStorage.getItem('user')) {
    next();
  } else {
    if (to.path === '/' || to.path === '/user/register') {
      next()
    } else {
      if (to.path.indexOf('/answerbox') !== -1) {
        window.localStorage.setItem('path', to.path);
      }
      next('/');
    }
  }
})

export default router