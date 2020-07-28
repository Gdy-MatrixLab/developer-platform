/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 10:02:49
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:29:59
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class ProjectService extends Service {
  /*
   * 查询所有可用的项目
   * @page 当前页数（ 默认 1）
   * @pageSize 单页数目（默认 10）
   */
  async query(page = 1, pageSize = 10) {
    const { ctx } = this

    const res = await ctx.model.Projects.findAndCountAll({
      attributes: ['project', 'created_at'],
      where: { is_use: 1 },
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    })

    return res
  }

  /*
   * 创建新的项目
   * @project 项目名称
   */
  async create(project) {
    const { ctx } = this

    if (!project) return {}

    // 判断是否已存在同名可用项目
    const isExisted = await ctx.model.Projects.findAndCountAll({
      where: { project, is_use: 1 },
    })

    if (!isExisted) {
      const res = await ctx.model.Projects.create({
        project,
      })

      return res
    }

    return {}
  }

  /*
   * 软删除已有的项目
   * @project 项目名称
   */
  async delete(project) {
    const { ctx } = this

    if (!project) return {}

    const res = await ctx.model.Projects.update(
      { is_use: 0 },
      {
        where: { project, is_use: 1 },
      }
    )

    return res
  }
}

module.exports = ProjectService
