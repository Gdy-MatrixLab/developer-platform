/*
 * @Author: Whzcorcd
 * @Date: 2020-07-13 14:55:37
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 10:18:02
 * @Description: file content
 */

'use strict'

const logger = require('./logger')
const script = require('./script')
const listener = require('./listener')
const message = require('./message')
const variate = require('./variate')

const modules = new Map([
  [
    'logger',
    params => {
      return logger(params)
    },
  ],
  [
    'script',
    params => {
      return script(params)
    },
  ],
  [
    'listener',
    params => {
      return listener(params)
    },
  ],
  [
    'message',
    params => {
      return message(params)
    },
  ],
  [
    'variate',
    params => {
      return variate(params)
    },
  ],
])

module.exports = serializedSchema => {
  // 内部容错
  if (serializedSchema instanceof Array) {
    let res = ''
    // 多模块连同配置
    serializedSchema.forEach(module => {
      const { type, params } = module
      if (modules.has(type)) res = res.concat(modules.get(type)(params))
    })
    return res
  }

  return ''
}
