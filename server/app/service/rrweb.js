/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 15:50:06
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-27 17:02:44
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class RrwebService extends Service {
  async query(page = 1, pageSize = 10) {
    const { ctx } = this

    const res = await ctx.model.Rrweb.findAndCountAll({
      attributes: ['project', 'uin', 'session', 'ip', 'start_time', 'end_time'],
      where: { is_use: 1 },
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    })

    return res
  }

  async get(session) {
    const { ctx } = this

    if (!session) return {}

    const res = await ctx.model.Rrweb.findOne({
      attributes: ['data'],
      where: { session, is_use: 1 },
    })

    const pako = require('pako')
    res.data = JSON.parse(pako.inflate(res.data, { to: 'string' }))

    return res
  }

  async create(params = {}) {
    const { ctx } = this

    if (!params) return {}

    const res = await ctx.model.Config.create({
      ...params,
    })

    return res
  }

  async update() {
    // todo 暂无更新数据功能
  }

  async delete(session) {
    const { ctx } = this

    if (!session) return {}

    const res = await ctx.model.Rrweb.update(
      { is_use: 0 },
      {
        where: { session, is_use: 1 },
      }
    )

    return res
  }
}

module.exports = RrwebService
