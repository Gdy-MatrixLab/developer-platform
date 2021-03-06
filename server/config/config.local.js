/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 12:22:50
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 11:10:51
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
    password: '123456',
    database: 'dynamic_code',
    timezone: '+08:00',
    define: {
      underscored: true,
      freezeTableName: true,
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
        dateStrings: true,
        typeCast(field, next) {
          // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
          return next()
        },
      },
    },
    operatorsAliases: 0,
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'whz18267590821',
      db: 0,
      weakDependent: true,
    },
  }

  config.jwt = {
    privateKey:
      'Fj&O!QcUDY0WoB7Mah722lWuGSvVyFJ$w2Vs08i27&25!eQ@zHAKR1J1QCn&ig%U8KayTOpb',
    publicKey: 'local',
    ignore: ['/api/v1/user/login'],
  }

  return config
}
