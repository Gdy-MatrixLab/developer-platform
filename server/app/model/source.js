/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:39:50
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:31:27
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, BOOLEAN } = app.Sequelize

  const Source = app.model.define(
    'source',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      content: { type: TEXT('long'), allowNull: false },
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

  return Source
}
