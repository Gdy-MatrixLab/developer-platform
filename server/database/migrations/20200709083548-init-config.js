/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 16:35:48
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 15:33:11
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 config 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, JSON, BOOLEAN } = Sequelize

    await queryInterface.createTable('config', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      project: { type: STRING(255), allowNull: false },
      desc: { type: STRING(2000), allowNull: false },
      prod: { type: BOOLEAN, allowNull: false, defaultValue: 1 },
      schema: { type: JSON, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: BOOLEAN, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 config 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('config')
  },
}
