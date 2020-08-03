/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 16:16:26
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:31:20
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, BOOLEAN } = app.Sequelize

  const Rrweb = app.model.define(
    'rrweb',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project: { type: STRING(255), allowNull: false },
      uin: { type: INTEGER, allowNull: false },
      ip: { type: STRING(20), allowNull: false },
      session: { type: STRING(50), allowNull: false },
      data: { type: TEXT('long'), allowNull: false },
      start_time: { type: INTEGER, allowNull: false },
      end_time: { type: INTEGER, allowNull: false },
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

  return Rrweb
}
