/*
 * @Author: Whzcorcd
 * @Date: 2020-07-28 09:56:48
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:58:22
 * @Description: file content
 */
import base from '@/api/base'
import Request from '@/request'

const Project = {
  project_list(data) {
    return Request.get(`${base.gateWay}/v1/project`, { data })
  },
  project_delete(project) {
    return Request.delete(`${base.gateWay}/v1/project/${project}`)
  }
}

export default Project
