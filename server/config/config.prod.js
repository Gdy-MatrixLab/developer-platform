/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 12:22:57
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 16:36:34
 * @Description: file content
 */

'use strict'

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'guangdianyun',
    database: 'developer_platform',
    operatorsAliases: 0,
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'guangdianyun',
      db: 0,
      weakDependent: true,
    },
  }

  config.jwt = {
    privateKey:
      '@3b^js3$WoeXiu!ijzFOvkT&70A927AU%8M6AgD8uxugwoN2lWivtn$UIX9M$rm7TpTlY0X1',
    publicKey: 'prod',
    ignore: ['/api/v1/user/login'],
  }

  return config
}
