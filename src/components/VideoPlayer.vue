<template>
  <div v-if="video" v-html="video.player.embedHtml"/>
</template>

<script>
  import VideoDetails from './VideoDetails'

  export default {
    name: 'videoPlayer',
    components: { VideoDetails },
    props: {
      videoId: {
        required: true
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
            maxWidth: 730,
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
