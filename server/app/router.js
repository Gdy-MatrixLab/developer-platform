/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:36:59
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 09:36:28
 * @Description: file content
 */

'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app

  router.post('/api/v1/user/login', controller.user.login)
  router.get(
    '/api/v1/user/account',
    middleware.auth({}, app),
    controller.user.account
  )
  router.post('/api/v1/user/logout', controller.user.logout)

  // project
  router.resources(
    'project',
    '/api/v1/project',
    middleware.auth({}, app),
    controller.project
  )

  // rrweb
  router.resources(
    'rrweb',
    '/api/v1/rrweb',
    middleware.auth({}, app),
    controller.rrweb
  )

  // 动态代码配置
  router.resources(
    'config',
    '/api/v1/config',
    middleware.auth({}, app),
    controller.config
  )

  // 动态代码获取
  router.resources('source', '/api/v1/source', controller.source)

  // 动态代码配置
  router.resources(
    'audit',
    '/api/v1/audit',
    middleware.auth({}, app),
    controller.audit
  )
}
