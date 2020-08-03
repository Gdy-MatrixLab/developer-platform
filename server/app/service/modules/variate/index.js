/*
 * @Author: Whzcorcd
 * @Date: 2020-08-03 10:17:25
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-03 16:06:27
 * @Description: file content
 */

'use strict'

module.exports = params => {
  const defaultParams = {
    var: '',
    data: '',
  }
  const options = Object.assign({}, defaultParams, params)
  const sourceArray = [
    '(function(){',
    `var temp = ${options.data};`,
    `window.${options.var} = temp;`,
    '}());',
  ]

  const res = sourceArray.reduce((acc, value) => acc + value)
  return res
}
