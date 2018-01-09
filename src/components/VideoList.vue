<template>
  <div class="videoList">
    <yt-video-thumbnail
      v-for="video in videos"
      :video="video"
      :key="video.id.videoId" />
  </div>
</template>

<script>
  import YtVideoThumbnail from './VideoThumbnail'

  export default {
    name: 'yt-video-list',
    components: { YtVideoThumbnail },
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
