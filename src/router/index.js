import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { 
    path: '/login', 
    component: _import('login/index'),
    hidden: true 
  },
  { 
    path: '/404', 
    component: _import('404'), 
    hidden: true 
  },

{
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'example', noCache: true }
    }]
},

  {
    path: '/query',
    component: Layout,
    redirect: '/query/UserInfo',
    name: 'Query',
    meta: { title: '信息查询', icon: 'example' },
    children: [
      {
        path: 'userinfo',
        name: 'UserInfo',
        component: _import('query/UserInfo'),
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: 'tribeinfo',
        name: 'TribeInfo',
        component: _import('query/TribeInfo'),
        meta: { title: '战队信息', icon: 'tree' }
      },
      {
        path: 'competitioninfo',
        name: 'CompetitionInfo',
        component: _import('query/CompetitionInfo'),
        meta: { title: '赛事信息', icon: 'tree' }
      },
      {
        path: 'reportfeedbackinfo',
        name: 'ReportFeedbackInfo',
        component: _import('query/ReportFeedbackInfo'),
        meta: { title: '反馈&举报', icon: 'tree' }
      },
      {
        path: 'fightinfo',
        name: 'FightInfo',
        component: _import('query/FightInfo'),
        meta: { title: '对局查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/statis',
    component: Layout,
    redirect: '/statis/UserStatis',
    name: 'Statis',
    meta: { title: '数据统计', icon: 'example' },
    children: [
      {
        path: 'UserStatis',
        name: 'userstatis',
        component: _import('statis/UserStatis'),
        meta: { title: '用户数据', icon: 'form' }
      },
      {
        path: 'tribestatis',
        name: 'TribeStatis',
        component: _import('statis/TribeStatis'),
        meta: { title: '战队数据', icon: 'form' }
      },
      {
        path: 'invitition',
        name: 'InvititionStatis',
        component: _import('statis/InvititionStatis'),
        meta: { title: '圈数据', icon: 'form' }
      },
      {
        path: 'dateball',
        name: 'DateballStatis',
        component: _import('statis/DateBallStatis'),
        meta: { title: '约球数据', icon: 'form' }
      },
      {
        path: 'gamestatis',
        name: 'GameStatis',
        component: _import('statis/GameStatis'),
        meta: { title: '游戏数据', icon: 'form' }
      },
      {
        path: 'eletronic',
        name: 'EletronicStatis',
        component: _import('statis/EletronicStatis'),
        meta: { title: '电子球杆', icon: 'form' }
      },
      {
        path: 'clickevents',
        name: 'ClickEventStatis',
        component: _import('statis/ClickEventStatis'),
        meta: { title: '点击事件', icon: 'form' }
      },
      {
        path: 'present',
        name: 'PresentStatis',
        component: _import('statis/PresentStatis'),
        meta: { title: '平台赠送', icon: 'form' }
      },
      {
        path: 'consume',
        name: 'ConsumeStatis',
        component: _import('statis/ConsumeStatis'),
        meta: { title: '用户消费', icon: 'form' }
      },
      {
        path: 'watch',
        name: 'WatchStatis',
        component: _import('statis/WatchStatis'),
        meta: { title: '观战数据', icon: 'form' }
      },
      {
        path: 'integra',
        name: 'IntegraStatis',
        component: _import('statis/IntegraStatis'),
        meta: { title: '积分数据', icon: 'form' }
      }
    ]
  },
  
  {
    path: '/management',
    component: Layout,
    redirect: 'management/usermanagement',
    name: 'management',
    meta: { title: '功能管理', icon: 'example' },
    children: [{
	      path: 'usermanagement',
	      name: 'UserManagement',
	      component: _import('management/UserManagement'),
	      meta: { title: '用户管理', icon: 'form' }
	    },
	    {
		  path: 'ordermanagement',
	      name: 'OrderManagement',
	      component: _import('management/OrderManagement'),
	      meta: { title: '订单管理', icon: 'form' }
	    },
	    {
		  path: 'compemanagement',
	      name: 'CompetitionManagement',
	      component: _import('management/CompetitionManagement'),
	      meta: { title: '赛事管理', icon: 'form' }
	    },
	    {
		  path: 'circlemanagement',
	      name: 'CircleManagement',
	      component: _import('management/CircleManagement'),
	      meta: { title: '圈管理', icon: 'form' }
	    },
	    {
		  path: 'bollmanagement',
	      name: 'BollroomManagement',
	      component: _import('management/BollroomManagement'),
	      meta: { title: '球房管理', icon: 'form' }
	    },
	    {
		  path: 'eletronicmanagement',
	      name: 'EletronicManagement',
	      component: _import('management/EletronicManagement'),
	      meta: { title: '电子球杆', icon: 'form' }
	    },
	    {
		  path: 'dataconfig',
	      name: 'Dataconfig',
	      component: _import('management/Dataconfig'),
	      meta: { title: '数据配置', icon: 'form' }
	    },
	    {
		  path: 'bonuscheck',
	      name: 'Bonuscheck',
	      component: _import('management/Bonuscheck'),
	      meta: { title: '奖金提现', icon: 'form' }
	    }
    ]
  },
  
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/UserInfo',
    name: 'Activity',
    meta: { title: '活动', icon: 'example' },
    children: [
      {
        path: 'lottery',
        name: 'Lottery',
        component: _import('activity/Lottery'),
        meta: { title: '抽奖配置', icon: 'table' }
      }
    ]
  },
  
  {
    path: '/sysconfig',
    component: Layout,
    redirect: '/sysconfig/Premission',
    name: 'Premission',
    meta: { title: '活动', icon: 'example' },
    children: [
      {
        path: 'premission',
        name: 'Premission',
        component: _import('sysconfig/Premission'),
        meta: { title: '权限配置', icon: 'table' }
      },
      {
        path: 'banner',
        name: 'Banner',
        component: _import('sysconfig/Banner'),
        meta: { title: 'banner配置', icon: 'table' }
      },
      {
        path: 'shareconfig',
        name: 'Shareconfig',
        component: _import('sysconfig/Shareconfig'),
        meta: { title: '分享配置', icon: 'table' }
      },
      {
        path: 'notesend',
        name: 'Notesend',
        component: _import('sysconfig/Notesend'),
        meta: { title: '短信群发', icon: 'table' }
      },
      {
        path: 'notice',
        name: 'Notice',
        component: _import('sysconfig/Notice'),
        meta: { title: '官方公告', icon: 'table' }
      }
    ]
  },
  { 
    path: '*', 
    redirect: '/404', 
    hidden: true 
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

