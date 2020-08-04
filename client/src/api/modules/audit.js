/*
 * @Author: Whzcorcd
 * @Date: 2020-08-04 10:02:02
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 10:02:32
 * @Description: file content
 */
import base from '@/api/base'
import Request from '@/request'

const Audit = {
  audit_list(data) {
    return Request.get(`${base.gateWay}/v1/audit`, { data })
  }
}

export default Audit
