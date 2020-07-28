<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-27 13:24:20
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-28 10:56:57
 * @Description: file content
-->
<template>
  <page-header-wrapper>
    <template v-slot:content> <div></div> </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="项目总数" :value="count" />
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="已记录项目" :bordered="false">
            <a-list>
              <a-list-item :key="item.project" v-for="item in projects">
                <a-list-item-meta>
                  <div slot="title">
                    <a @click="handleItemClick(item.project)">
                      {{ item.project }}
                    </a>
                  </div>
                  <div slot="description">{{ item.created_at || '/' }}</div>
                </a-list-item-meta>
                <div>
                  <a-popconfirm
                    title="删除前请确认记录是否不再被需要"
                    ok-text="是"
                    cancel-text="否"
                    style="color: red"
                    @confirm="deleteRecode(item.project)"
                  >
                    <a-icon
                      slot="icon"
                      type="question-circle-o"
                      style="color: red"
                    />
                    <a href="#">删除项目</a>
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
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import API from '@/api'

export default {
  name: 'Projects',
  components: {
    PageHeaderWrapper
  },
  data() {
    return {
      loading: true,
      page: 1,
      pageSize: 6,

      projects: [],
      count: 0
    }
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    async getProjects() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        const response = await API.Project.project_list(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { count, rows } = response.data.data
          this.count = count
          this.projects = rows
        }
      } catch (err) {
        console.log(err)
      }
    },
    async deleteRecode(project) {
      try {
        const response = await API.RRweb.project_delete(project)
        const { status } = response.data
        if (Number(status) === 200) {
          this.getProjects()
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleItemClick(project) {
      this.$router.push({ path: `/rrweb/catalogues/${project}` })
    },
    handlePaginationChange(e) {
      if (e) {
        this.page = Number(e)
        this.getApplications()
      }
    }
  }
}
</script>

<style></style>
