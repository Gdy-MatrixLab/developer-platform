/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 15:47:43
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-27 16:44:59
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class RRwebController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.appidRule = {
      id: { type: 'string', required: true },
    }
  }

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
    const res = await service.rrweb.query(page, pageSize)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  async create() {
    const { ctx, service } = this

    const indexRule = {
      project: { type: 'string', required: true },
      uin: { type: 'string', required: true },
      session: { type: 'string', required: true },
      data: { type: 'string', required: false },
      startTime: { type: 'string', required: false },
      endTime: { type: 'string', required: false },
    }

    try {
      ctx.validate(indexRule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { project, uin, session, data, startTime, endTime } = ctx.request.body
    const res = await service.rrweb.create({
      project,
      uin: Number(uin),
      session,
      data,
      start_time: Number(startTime),
      end_time: Number(endTime),
    })

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, {}, 'success')
  }

  async show() {
    const { ctx, service } = this

    // id 指代 session
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
    const res = await service.rrweb.get(id)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  async update() {
    // todo 暂无更新数据功能
    const { ctx } = this

    ctx.body = Object.assign({}, this.defaultResponse, {
      status: -1,
      data: {},
      msg: 'not permitted',
    })
    ctx.status = 403
  }

  async destroy() {
    const { ctx, service } = this

    // id 指代 session
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

module.exports = RRwebController
