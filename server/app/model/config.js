/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 17:25:43
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:33:20
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, JSON, BOOLEAN } = app.Sequelize

  const Config = app.model.define(
    'config',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      project: { type: STRING(255), allowNull: false },
      desc: { type: STRING(2000), allowNull: false },
      prod: { type: BOOLEAN, allowNull: false, defaultValue: 1 },
      schema: { type: JSON, allowNull: false },
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

  return Config
}
