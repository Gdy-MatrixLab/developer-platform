/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 09:54:18
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:31:11
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize

  const Projects = app.model.define(
    'projects',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project: { type: STRING(255), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: BOOLEAN, defaultValue: 1 },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Projects
}
