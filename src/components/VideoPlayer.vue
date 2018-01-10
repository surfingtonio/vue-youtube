<template>
  <div class="videoPlayer" v-if="video" v-html="video.player.embedHtml" />
</template>

<script>
  export default {
    name: 'yt-video-player',
    props: {
      videoId: {
        required: true
      },
      width: {
        default: null
      },
      height: {
        default: null
      }
    },

    data () {
      return {
        video: ''
      }
    },

    created () {
      this.fetchVideo()
    },

    methods: {

      fetchVideo () {
        this.$axios.get('/videos', {
          params: {
            part: 'player',
            maxWidth: this.width,
            maxHeight: this.height,
            id: this.videoId
          }
        })
          .then(res => {
            this.video = res.data.items[0]
          })
      }

    },

    watch: {

      videoId () {
        this.fetchVideo()
      }

    }

  }
</script>
