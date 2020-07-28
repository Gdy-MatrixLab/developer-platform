/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 15:47:43
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:54:22
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
   * 查询所有记录
   * @page 当前页数
   * @pageSize 单页数目
   */
  async index() {
    const { ctx, service } = this

    const indexRule = {
      project: { type: 'string', required: true },
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

    const { project, page, pageSize } = ctx.query
    const res = await service.rrweb.query(project, page, pageSize)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  /*
   * 创建新的记录
   * @project 项目名称
   * @uin uin
   * @session session
   * @data 二进制压缩数据体
   * @startTime 开始时间戳
   * @endTime 结束时间戳
   */
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

    await service.project.create({
      project,
    })

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

  /*
   * 获取已有的指定记录数据
   * @id session
   */
  async show() {
    const { ctx, service } = this

    try {
      ctx.validate(this.appidRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    // id 指代 session
    const { id } = ctx.params
    const res = await service.rrweb.get(id)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  async update() {
    // TODO 暂无更新数据功能
    const { ctx } = this

    ctx.returnCtxBody(403, {}, 'not permitted')
  }

  /*
   * 软删除已有的指定记录数据
   * @id session
   */
  async destroy() {
    const { ctx, service } = this

    try {
      ctx.validate(this.appidRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    // id 指代 session
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
