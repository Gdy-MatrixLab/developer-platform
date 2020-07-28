/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 09:54:18
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 09:54:58
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Projects = app.model.define(
    'projects',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project: { type: STRING(255), allowNull: false },
      created_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    },
    {
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Projects
}
