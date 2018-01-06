<template>
  <div class="videoPlayer" v-if="video">
    <span v-html="video.player.embedHtml"></span>
    <VideoDetails :video="video"/>
  </div>
</template>

<script>
  import VideoDetails from './VideoDetails'

  export default {
    name: 'videoPlayer',
    components: { VideoDetails },
    props: [ 'videoId' ],

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
            key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
            part: 'snippet,player,statistics',
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

<style>
  .videoPlayer {
  }
</style>
