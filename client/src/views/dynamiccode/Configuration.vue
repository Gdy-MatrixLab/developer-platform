<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-23 11:45:04
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-08-04 10:15:04
 * @Description: file content
-->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" title="应用配置" :bordered="false">
          <a-button
            slot="extra"
            type="default"
            style="margin-right: 10px"
            :disabled="defaultAppConfig === {}"
            @click="restoreApplicationConfig"
          >
            还原配置
          </a-button>
          <a-button
            slot="extra"
            type="primary"
            @click="updateApplicationConfig"
          >
            发布配置
          </a-button>

          <a-form-model ref="form" :model="appConfig" v-bind="formItemLayout">
            <a-form-model-item ref="appid" label="Appid" prop="appid">
              <span style="font-weight: bold">{{ appConfig.appid }}</span>
            </a-form-model-item>
            <a-form-model-item ref="appid" label="发布地址" prop="appid">
              <span style="font-weight: bold">
                {{ getOrigin }}/api/v1/source/{{ appConfig.appid }}
              </span>
            </a-form-model-item>
            <a-form-model-item ref="project" label="最后提交" prop="updated_at">
              <span style="font-weight: bold">
                {{ timeFormat(appConfig.updated_at) }}
              </span>
            </a-form-model-item>
            <a-form-model-item ref="project" label="应用名称" prop="project">
              <a-input v-model="appConfig.project" />
            </a-form-model-item>
            <a-form-model-item ref="desc" label="应用描述" prop="desc">
              <a-input v-model="appConfig.desc" />
            </a-form-model-item>
            <a-form-model-item ref="prod" label="生产环境" prop="prod">
              <a-switch
                v-model="appConfig.prod"
                default-checked
                @change="handleSwitchChange($event)"
              />
            </a-form-model-item>
            <a-form-model-item
              v-for="(item, index) in appConfig.schema"
              :key="index"
              label="Schema 项"
            >
              <a-select
                :default-value="item.type"
                style="width: 140px"
                @change="handleSelectChange($event, index)"
              >
                <a-select-option
                  v-for="i in options"
                  :key="i.value"
                  :value="i.value"
                >
                  {{ i.name }}
                </a-select-option>
              </a-select>
              <a-input
                v-for="k in options.filter(ele => ele.value === item.type)[0]
                  .params"
                :key="k"
                :addon-before="k"
                :value="item.params[k]"
                @change="handleInputChange($event, index, k)"
              />
              <a-collapse v-if="encode(item.type)" accordion>
                <a-collapse-panel key="editor" header="代码编辑器">
                  <codemirror
                    class="CodeMirror"
                    :value="item.params[encode(item.type)]"
                    :options="cmOptions"
                    @input="handleInputChange($event, index, encode(item.type))"
                  />
                </a-collapse-panel>
              </a-collapse>
              <a-button
                type="default"
                icon="delete"
                @click="removeDomain(index)"
              />
            </a-form-model-item>
            <a-form-model-item label="Schema 总览">
              <codemirror
                class="CodeMirror"
                ref="cmEditor"
                :value="JSON.stringify(appConfig.schema)"
                :options="
                  Object.assign({}, cmOptions, {
                    readOnly: true
                  })
                "
              />
              <a-button
                type="default"
                icon="align-left"
                @click="handleFormatClick"
              />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 20, offset: 5 }">
              <a-button type="dashed" style="width: 60%" @click="addDomain">
                <a-icon type="plus" /> 增加配置项
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { timeFormat } from '@/utils/util'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/hint/javascript-hint'
import '@/utils/formatter'
// import theme style
import 'codemirror/theme/idea.css'

import { cloneDeep } from 'lodash-es'
import { getOrigin } from '@/utils/util'
import API from '@/api'

export default {
  name: 'Configuration',
  components: {
    codemirror
  },
  data() {
    const schemaItem = new Map([
      ['logger', { level: '', msg: '' }],
      ['script', { url: '', async: '', onload: '' }],
      ['listener', { target: '', listener: '', content: '' }],
      ['message', { subkey: '', topic: '', actions: '' }],
      ['variate', { var: '', data: '' }]
    ])
    return {
      timeFormat: timeFormat,

      cmOptions: {
        tabSize: 2,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: 'idea',
        lineNumbers: true,
        line: true,
        lineWrapping: 'warp',
        cursorHeight: 1,
        extraKeys: {
          F7: editor => {
            const totalLines = editor.lineCount()
            editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines })
          }
        }
      },
      options: [
        {
          name: '控制台输出',
          value: 'logger',
          editor: false,
          params: ['level', 'msg']
        },
        {
          name: '脚本加载',
          value: 'script',
          editor: 'onload',
          params: ['url', 'async', 'onload']
        },
        {
          name: '全局侦听器',
          value: 'listener',
          editor: 'content',
          params: ['target', 'listener', 'content']
        },
        {
          name: 'DMS 消息通知',
          value: 'message',
          editor: 'actions',
          params: ['subkey', 'topic', 'actions']
        },
        {
          name: '全局变量',
          value: 'variate',
          editor: 'data',
          params: ['var', 'data']
        }
      ],
      schemaItem: schemaItem,
      timer: null,

      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      dynamicValidateForm: {
        domains: []
      },

      getOrigin: getOrigin(),
      loading: true,
      appid: '',
      defaultAppConfig: {},
      appConfig: {
        appid: '',
        project: '',
        schema: ''
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    },
    encode() {
      return type => {
        return this.options.filter(ele => ele.value === type)[0].editor
      }
    }
  },
  mounted() {
    const { appid } = this.$route.params
    this.appid = appid
    this.appid && this.getApplicationConfig()
  },
  methods: {
    async getApplicationConfig() {
      try {
        const params = this.appid
        const response = await API.Config.config_read(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { data } = response.data
          this.appConfig = Object.assign({}, data, {
            schema: data.schema ? JSON.parse(data.schema) : ''
          })
          this.defaultAppConfig = cloneDeep(this.appConfig)
          // console.log(this.appConfig.schema)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async updateApplicationConfig() {
      try {
        const params = {
          project: this.appConfig.project,
          desc: this.appConfig.desc,
          prod: this.appConfig.prod,
          schema: JSON.stringify(this.appConfig.schema)
        }
        const response = await API.Config.config_update(this.appid, params)
        const { status, msg } = response.data
        if (Number(status) === 200) {
          this.loading = true
          this.openNotificationWithIcon('success', '发布成功', msg)
          this.getApplicationConfig()
        } else {
          this.openNotificationWithIcon(
            'error',
            '发布失败',
            `(${status}) ${msg}`
          )
        }
      } catch (err) {
        console.log(err)
        this.openNotificationWithIcon('error', '发布失败', err)
      }
    },
    restoreApplicationConfig() {
      if (this.defaultAppConfig) {
        this.appConfig = cloneDeep(this.defaultAppConfig)
      }
    },
    removeDomain(index) {
      this.appConfig.schema.splice(index, 1)
    },
    addDomain() {
      const type = 'logger'
      this.appConfig.schema.push({
        type: type,
        params: this.schemaItem.get(type)
      })
      // console.log(this.appConfig.schema)
    },
    openNotificationWithIcon(type, title, desc) {
      this.$notification[type]({
        message: title || 'Notification Title',
        description: desc || ''
      })
    },
    handleSwitchChange() {
      // TODO
    },
    handleSelectChange(e, index) {
      this.$set(this.appConfig.schema, index, {
        type: e,
        params: this.schemaItem.get(e)
      })
      // console.log(this.appConfig.schema[index])
    },
    handleInputChange(e, index, key) {
      if (typeof e === 'string') {
        this.$set(this.appConfig.schema[index].params, key, e)
        return
      }
      this.$set(this.appConfig.schema[index].params, key, e.target.value)
    },
    handleFormatClick() {
      const totalLines = this.codemirror.lineCount()
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.codemirror.autoFormatRange(
          { line: 0, ch: 0 },
          { line: totalLines }
        )
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  line-height: 120%;
}
</style>

<style lang="less">
.ant-collapse-content > .ant-collapse-content-box {
  padding: 0;
}
.CodeMirror-lines {
  font-size: 12px;
}
</style>
