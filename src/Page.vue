<template>
  <div id="app">

    <app-navbar @searchEnter="updateQuery" />

    <!-- Large screen layout -->
    <div class="container d-none d-lg-block">
      <div class="row no-gutters">
        <div class="col-8">
          <yt-video-player class="mb-4" v-if="videoId" :videoId="videoId" />
          <yt-video-details v-if="videoId" :videoId="videoId" />
        </div>
        <div class="col-4">
          <yt-video-list class="pl-3" :videoIds="videoIds" />
        </div>
      </div>
    </div>

    <!-- Medium screen layout -->
    <div class="container d-none d-md-block d-lg-none">
      <div class="row no-gutters mb-4">
        <div class="col">
          <yt-video-player v-if="videoId" :videoId="videoId" />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <yt-video-details v-if="videoId" :videoId="videoId" />
        </div>
        <div class="col-6">
          <yt-video-list :videoIds="videoIds" />
        </div>
      </div>
    </div>

    <!-- Small screen layout -->
    <div class="container px-0 d-sm-block d-md-none">
      <yt-search class="mb-4 d-sm-block d-md-none" @searchEnter="updateQuery" />
      <div class="row no-gutters mb-4">
        <div class="col">
          <yt-video-player v-if="videoId" :videoId="videoId" />
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col px-3">
          <yt-video-details v-if="videoId" :videoId="videoId" />
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col px-3">
          <yt-video-list :videoIds="videoIds" />
        </div>
      </div>
    </div>

    <app-footer />

  </div>
</template>

<script>
  import AppNavbar from './components/Navbar'
  import AppFooter from './components/Footer'
  import YtSearch from './components/Search'
  import YtVideoPlayer from './components/VideoPlayer.vue'
  import YtVideoDetails from './components/VideoDetails.vue'
  import YtVideoList from './components/VideoList.vue'

  export default {
    name: 'page',
    components: { AppNavbar, AppFooter, YtSearch, YtVideoPlayer, YtVideoDetails, YtVideoList },

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
