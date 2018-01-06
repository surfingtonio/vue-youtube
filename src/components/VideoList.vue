<template>
  <div class="videoList">
    <VideoThumbnail
      :video="video" v-for="video in videos"
      :key="video.id.videoId"/>
  </div>
</template>

<script>
  import VideoThumbnail from './VideoThumbnail'

  export default {
    name: 'videoList',
    components: { VideoThumbnail },
    props: {
      videoIds: { default: () => [] }
    },

    data () {
      return {
        videos: []
      }
    },

    created () {
      if (this.videoIds.length > 0) {
        this.fetchVideos()
      }
    },

    methods: {

      fetchVideos () {
        this.$axios.get('/videos', {
          params: {
            part: 'snippet,statistics',
            id: this.videoIds.join(',')
          }
        })
          .then(res => {
            this.videos = res.data.items
          })
      }

    },

    watch: {

      videoIds () {
        if (this.videoIds.length > 0) {
          this.fetchVideos()
        }
      }

    }

  }
</script>
