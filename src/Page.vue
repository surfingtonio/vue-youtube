<template>
  <div id="app">

    <app-navbar @searchEnter="updateQuery" />

    <div class="container px-0">
      <div class="row no-gutters">
        <div class="col-lg-8">

          <yt-search class="d-block d-sm-none mb-4" @searchEnter="updateQuery" />

          <div class="videoPlayer">
            <yt-video-player v-if="videoId" :videoId="videoId" :width="videoWidth" />
          </div>

          <div class="videoDetailsWrapper" v-if="videoId">
            <yt-video-details :videoId="videoId" />
          </div>

        </div>
        <div class="col-lg-4">

          <div class="videoListWrapper">
            <yt-video-list :videoIds="videoIds" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNavbar from './components/Navbar'
  import YtSearch from './components/Search'
  import YtVideoPlayer from './components/VideoPlayer.vue'
  import YtVideoDetails from './components/VideoDetails.vue'
  import YtVideoList from './components/VideoList.vue'

  export default {
    name: 'page',
    components: { AppNavbar, YtSearch, YtVideoPlayer, YtVideoDetails, YtVideoList },

    data () {
      return {
        'q': 'samsung s8',
        'videoId': this.$route.params.id || '',
        'videoIds': [],
        'videoWidth': null
      }
    },

    created () {
      this.fetchVideos()
    },

    methods: {

      fetchVideos () {
        this.$axios.get('/search', this.videoId
          ? { params: { relatedToVideoId: this.videoId } }
          : { params: { q: this.q } })
          .then(res => {
            if (!this.videoId) {
              let video = res.data.items.shift()
              this.videoId = video.id.videoId
            }
            this.videoIds = res.data.items.map(v => v.id.videoId)
          })
      },

      updateQuery (q) {
        this.q = q
        this.videoId = ''
        this.fetchVideos()
      }

    }

  }
</script>

<style scoped>
  .videoDetailsWrapper {
    padding: 0 15px;
  }
  .videoListWrapper {
    padding: 0 15px
  }
</style>
