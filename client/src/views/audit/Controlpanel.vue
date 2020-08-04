<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-29 10:46:05
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 10:45:11
 * @Description: file content
-->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" title="审计日志" :bordered="false">
          <a-list>
            <a-list-item :key="item.project" v-for="item in audits">
              <a-list-item-meta>
                <div slot="title">
                  <a>{{ item.operater }} </a><span> {{ item.url }}</span>
                </div>
                <div slot="description">{{ item.referer }}</div>
              </a-list-item-meta>
              <div>
                {{ timeFormat(item.created_at) || '/' }}
              </div>
            </a-list-item>
          </a-list>
          <a-row>
            <a-col :span="8"> </a-col>
            <a-col :span="8">
              <a-pagination
                simple
                :defaultCurrent="page"
                :defaultPageSize="pageSize"
                :total="count"
                style="width: 100%; text-align: center;"
                @change="handlePaginationChange($event)"
              />
            </a-col>
            <a-col :span="8"> </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { timeFormat } from '@/utils/util'
import API from '@/api'

export default {
  name: 'Controlpanel',
  data() {
    return {
      timeFormat: timeFormat,

      loading: true,
      page: 1,
      pageSize: 10,

      audits: [],
      count: 0
    }
  },
  mounted() {
    this.getAudits()
  },
  methods: {
    async getAudits() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        const response = await API.Audit.audit_list(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { count, rows } = response.data.data
          this.count = count
          this.audits = rows
        }
      } catch (err) {
        console.log(err)
      }
    },
    handlePaginationChange(e) {
      if (e) {
        this.page = Number(e)
        this.getAudits()
      }
    }
  }
}
</script>

<style></style>
