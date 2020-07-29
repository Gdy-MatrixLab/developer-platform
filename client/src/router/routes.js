/*
 * @Author: Whzcorcd
 * @Date: 2020-07-17 15:14:53
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-29 10:56:34
 * @Description: file content
 */
import { BasicLayout, RouteView, UserLayout } from '@/layouts'
import { bxAnaalyse } from '@/material/icons'

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '开发者平台' },
    redirect: '/dashboard',
    children: [
      // application
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workspace',
        component: RouteView,
        meta: {
          title: '平台总览',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/dashboard/workspace',
            name: 'workspace',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/dashboard/Workspace'
              ),
            meta: {
              title: '工作台',
              keepAlive: true
            }
          },
          // 外部链接
          {
            path: 'https://www.guangdianyun.tv/',
            name: 'offical',
            meta: { title: '广电云官网', target: '_blank' }
          },
          {
            path: 'https://consoles.guangdianyun.tv/',
            name: 'console',
            meta: { title: '广电云控制台', target: '_blank' }
          }
        ]
      },
      // dynamiccode
      {
        path: '/dynamiccode',
        name: 'dynamiccode',
        redirect: '/dynamiccode/applications',
        component: RouteView,
        meta: {
          title: '动态代码下发系统',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/dynamiccode/applications',
            name: 'applications',
            component: () =>
              import(
                /* webpackChunkName: "dynamiccode" */ '@/views/dynamiccode/Applications'
              ),
            meta: {
              title: '应用列表',
              keepAlive: true
            }
          },
          {
            path: '/dynamiccode/configuration/:appid',
            name: 'configuration',
            component: () =>
              import(
                /* webpackChunkName: "dynamiccode" */ '@/views/dynamiccode/Configuration'
              ),
            meta: {
              title: '应用配置'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/rrweb',
        name: 'rrweb',
        component: RouteView,
        meta: {
          title: '错误反馈回放系统',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/rrweb/projects',
            name: 'projects',
            component: () =>
              import(/* webpackChunkName: "rrweb" */ '@/views/rrweb/Projects'),
            meta: {
              title: '项目列表'
            }
          },
          {
            path: '/rrweb/replay/:session',
            name: 'replay',
            component: () =>
              import(/* webpackChunkName: "rrweb" */ '@/views/rrweb/Replay'),
            meta: {
              title: '回放器'
            }
          },
          {
            path: '/rrweb/catalogues/:project',
            name: 'catalogues',
            component: () =>
              import(
                /* webpackChunkName: "rrweb" */ '@/views/rrweb/Catalogues'
              ),
            meta: {
              title: '记录条目'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/polyhedron',
        name: 'polyhedron',
        component: RouteView,
        meta: {
          title: '多面体自动测评系统',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/polyhedron/lite',
            name: 'lite',
            component: () =>
              import(
                /* webpackChunkName: "polyhedron" */ '@/views/polyhedron/Lite'
              ),
            meta: {
              title: '简易配置'
            }
          }
        ]
      },
      {
        path: '/audit',
        name: 'audit',
        component: RouteView,
        meta: {
          title: '平台审计系统',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/audit/controlpanel',
            name: 'controlpanel',
            component: () =>
              import(
                /* webpackChunkName: "controlpanel" */ '@/views/audit/Controlpanel'
              ),
            meta: {
              title: '审计面板'
            }
          }
        ]
      },
      {
        path: '/account',
        name: 'account',
        component: RouteView,
        meta: {
          title: '账户综合管理系统',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/account/console',
            name: 'console',
            component: () =>
              import(
                /* webpackChunkName: "account" */ '@/views/account/Console'
              ),
            meta: {
              title: '管理控制台'
            }
          }
        ]
      },
      // application
      // {
      //   path: '/application',
      //   name: 'application',
      //   component: constantRouterComponents.Application,
      //   meta: {
      //     title: '应用管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // }
      // {
      //   path: '/project',
      //   name: 'project',
      //   component: constantRouterComponents.Project,
      //   meta: {
      //     title: '项目管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // },
      // {
      //   path: '/modules',
      //   name: 'modules',
      //   component: constantRouterComponents.Modules,
      //   meta: {
      //     title: '模块管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // }
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning' },
        hidden: true,
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () =>
              import(
                /* webpackChunkName: "exception" */ '@/views/exception/403'
              ),
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () =>
              import(
                /* webpackChunkName: "exception" */ '@/views/exception/404'
              ),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () =>
              import(
                /* webpackChunkName: "exception" */ '@/views/exception/500'
              ),
            meta: { title: '500' }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      // login
      {
        path: '/user/login',
        name: 'login',
        meta: { title: '登录' },
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/exception/404')
  }
]

export default routes
