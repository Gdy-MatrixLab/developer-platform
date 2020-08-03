/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 09:40:34
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:30:56
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, BOOLEAN } = Sequelize

    await queryInterface.createTable('projects', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project: { type: STRING(255), allowNull: false },
      created_at: DATE,
      is_use: { type: BOOLEAN, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects')
  },
}
