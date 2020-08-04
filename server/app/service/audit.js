/*
 * @Author: Whzcorcd
 * @Date: 2020-08-04 09:42:53
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 10:24:38
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class AuditService extends Service {
  /*
   * 查询所有审计记录
   * @page 当前页数（ 默认 1）
   * @pageSize 单页数目（默认 10）
   */
  async query(page = 1, pageSize = 10) {
    const { ctx } = this

    const res = await ctx.model.Audits.findAndCountAll({
      where: { is_use: 1 },
      order: [['id', 'desc']],
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    })

    return res
  }
}

module.exports = AuditService
