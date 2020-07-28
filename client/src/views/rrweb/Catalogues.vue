<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-27 13:30:07
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 11:08:02
 * @Description: file content
-->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :title="`${projectName}`" :bordered="false">
          <a-list>
            <a-list-item :key="item.session" v-for="item in recodes">
              <a-list-item-meta>
                <div slot="title">
                  <a @click="handleItemClick(item.session)">
                    {{ item.session }}
                    <span style="font-size: 12px; color: rgba(0, 0, 0, 0.3)">
                      {{ timeFormat(item.start_time) }}
                      --
                      {{ timeFormat(item.end_time) }}
                    </span>
                  </a>
                </div>
                <div slot="description">{{ item.ip || '/' }}</div>
              </a-list-item-meta>
              <div>
                <a-popconfirm
                  title="删除前请确认记录是否不再被需要"
                  ok-text="是"
                  cancel-text="否"
                  style="color: red"
                  @confirm="deleteRecode(item.session)"
                >
                  <a-icon
                    slot="icon"
                    type="question-circle-o"
                    style="color: red"
                  />
                  <a href="#">删除记录</a>
                </a-popconfirm>
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
  name: 'Catalogues',
  data() {
    return {
      timeFormat: timeFormat,

      loading: true,
      page: 1,
      pageSize: 6,

      projectName: '',
      recodes: [],
      count: 0
    }
  },
  mounted() {
    const { project } = this.$route.params
    this.projectName = project
    this.projectName && this.getProjectRecodes()
  },
  methods: {
    async getProjectRecodes() {
      try {
        const params = {
          project: this.projectName,
          page: this.page,
          pageSize: this.pageSize
        }
        const response = await API.RRweb.rrweb_list(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { count, rows } = response.data.data
          this.count = count
          this.recodes = rows
        }
      } catch (err) {
        console.log(err)
      }
    },
    async deleteRecode(session) {
      try {
        const response = await API.RRweb.rrweb_delete(session)
        const { status } = response.data
        if (Number(status) === 200) {
          this.getProjects()
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleItemClick(session) {
      this.$router.push({ path: `/rrweb/replay/${session}` })
    },
    handlePaginationChange(e) {
      if (e) {
        this.page = Number(e)
        this.getProjectRecodes()
      }
    }
  }
}
</script>

<style></style>
