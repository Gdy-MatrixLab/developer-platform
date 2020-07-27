/*
 * @Author: Whzcorcd
 * @Date: 2020-07-27 16:38:54
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-27 17:07:31
 * @Description: file content
 */
import base from '@/api/base'
import Request from '@/request'

const RRweb = {
  rrweb_list(data) {
    return Request.get(`${base.gateWay}/v1/rrweb`, { data })
  },
  rrweb_recode(session) {
    return Request.get(`${base.gateWay}/v1/rrweb/${session}`)
  },
  rrweb_delete(session) {
    return Request.delete(`${base.gateWay}/v1/rrweb/${session}`)
  }
}

export default RRweb
