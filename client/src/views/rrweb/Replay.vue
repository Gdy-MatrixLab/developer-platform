<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-27 13:25:37
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-27 17:04:04
 * @Description: file content
-->
<template>
  <div class="player-container"><div class="cleanfix" id="replayer"></div></div>
</template>

<script>
import RRWebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'
import events from '@/assets/scripts/event'

import API from '@/api'

export default {
  name: 'Replayer',
  data() {
    return {
      player: null,
      session: '',
      data: []
    }
  },
  async mounted() {
    const { session } = this.$route.params
    this.session = session

    await this.getData()

    if (!this.player) {
      this.player = new RRWebPlayer({
        target: document.getElementById('replayer'),
        data: {
          events: this.data || events,
          skipInactive: true,
          showDebug: false,
          autoPlay: false,
          showWarning: false
        }
      })
    }
  },
  beforeDestroy() {
    this.player = null
  },
  methods: {
    async getData() {
      try {
        const params = this.session
        const response = await API.RRweb.rrweb_recode(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { data } = response.data.data
          this.data = data
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.player-container {
  display: flex;
  justify-content: center;
  padding: 20px;

  .cleanfix {
    zoom: 1;
    &::before,
    &::after {
      display: table;
      content: ' ';
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }
}
</style>
