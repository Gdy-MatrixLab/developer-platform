/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 10:03:14
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:19:51
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  /*
   * 查询所有可用的项目
   * @page 当前页数
   * @pageSize 单页数目
   */
  async index() {
    const { ctx, service } = this

    const indexRule = {
      page: { type: 'string', required: false },
      pageSize: { type: 'string', required: false },
    }

    try {
      ctx.validate(indexRule, ctx.query)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { page, pageSize } = ctx.query
    const res = await service.project.query(page, pageSize)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  async destroy() {
    const { ctx, service } = this

    // id 指代 project
    const indexRule = {
      id: { type: 'string' },
    }

    try {
      ctx.validate(indexRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { id } = ctx.params
    const res = await service.data.delete(id)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, {}, 'success')
  }
}

module.exports = ProjectController
