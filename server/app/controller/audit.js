/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:47:08
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 09:42:38
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class AuditController extends Controller {
  /*
   * 查询所有审计记录
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
    const res = await service.audit.query(page, pageSize)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }
}

module.exports = AuditController
