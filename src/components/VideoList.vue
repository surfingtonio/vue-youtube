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
      this.fetchVideos()
    },

    methods: {

      fetchVideos () {
        if (this.videoIds.length === 0) return

        this.$axios.get('/videos', {
          params: {
            part: 'snippet,statistics,contentDetails',
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
        this.fetchVideos()
      }

    }

  }
</script>
