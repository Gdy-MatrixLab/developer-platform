/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:31:32
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 17:47:41
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize

  const Users = app.model.define(
    'users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      created_at: DATE,
      is_use: { type: BOOLEAN, defaultValue: 1 },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Users
}
