/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 16:08:13
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-27 16:44:38
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 config 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE } = Sequelize

    await queryInterface.createTable('rrweb', {
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
      is_use: { type: INTEGER, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 config 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rrweb')
  },
}
