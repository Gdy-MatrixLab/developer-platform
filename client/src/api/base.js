/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:32:03
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 18:01:18
 * @Description: file content
 */
const base = {
  gateWay:
    process.env.NODE_ENV === 'development'
      ? '//127.0.0.1:7001/api'
      : '//devops.guangdianyun.tv/api'
}

export default base
