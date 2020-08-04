/*
 * @Author: Whzcorcd
 * @Date: 2020-08-03 16:43:20
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 09:24:07
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, JSON, BOOLEAN } = Sequelize

    await queryInterface.createTable('audits', {
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
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('audits')
  },
}
