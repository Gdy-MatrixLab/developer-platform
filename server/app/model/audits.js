/*
 * @Author: Whzcorcd
 * @Date: 2020-08-03 16:54:06
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 09:24:18
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, JSON, BOOLEAN } = app.Sequelize

  const Audits = app.model.define(
    'audits',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      operater: { type: STRING(255), allowNull: false },
      method: { type: STRING(20), allowNull: false },
      url: { type: STRING(500), allowNull: false },
      query: { type: JSON, allowNull: false },
      body: { type: JSON, allowNull: false },
      referer: { type: STRING(500), allowNull: false },
      user_agent: { type: STRING(400), allowNull: false },
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

  return Audits
}
