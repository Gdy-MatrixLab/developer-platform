/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:31:32
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 20:03:51
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Users = app.model.define(
    'users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      created_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    },
    {
      timestamps: false,
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Users
}
