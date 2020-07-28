/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 15:50:06
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:55:13
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class RrwebService extends Service {
  /*
   * 查询所有可用的记录
   * @project 项目名称
   * @page 当前页数（ 默认 1）
   * @pageSize 单页数目（默认 10）
   */
  async query(project, page = 1, pageSize = 10) {
    const { ctx } = this

    const res = await ctx.model.Rrweb.findAndCountAll({
      attributes: ['project', 'uin', 'session', 'ip', 'start_time', 'end_time'],
      where: { project, is_use: 1 },
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    })

    return res
  }

  /*
   * 获取已有的指定记录
   * @session 记录的 session
   */
  async get(session) {
    const { ctx } = this

    if (!session) return {}

    const res = await ctx.model.Rrweb.findOne({
      attributes: ['data'],
      where: { session, is_use: 1 },
    })

    if (res) {
      const pako = require('pako')
      res.data = JSON.parse(pako.inflate(res.data, { to: 'string' }))

      return res
    }

    return {}
  }

  /*
   * 创建新的记录
   * @params 记录参数
   */
  async create(params = {}) {
    const { ctx } = this

    if (!params) return {}

    const res = await ctx.model.Config.create({
      ...params,
    })

    return res
  }

  /*
   * 更新已有的指定记录
   * @session 记录的 session
   */
  async update() {
    // TODO 暂无更新数据功能
  }

  /*
   * 软删除已有的指定记录
   * @session 记录的 session
   */
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
