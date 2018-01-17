<template>
  <div id="app">

    <app-navbar @searchEnter="updateQuery" />

    <div class="main container px-0">
      <yt-search class="mb-4 w-100 d-block d-md-none" @searchEnter="updateQuery" />
      <yt-video-player v-if="videoId" :videoId="videoId" />
      <yt-video-details v-if="videoId" :videoId="videoId" />
      <yt-video-list :videoIds="videoIds" />
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
        'q': '',
        'videoId': this.$route.params.id || this.$cookie.get('videoId') || '',
        'videoIds': [],
        'videoWidth': null
      }
    },

    created () {
      this.fetchVideos()
    },

    methods: {

      fetchVideos () {
        if (this.videoId || this.q) {
          this.$axios.get('/search', this.videoId
            ? { params: { relatedToVideoId: this.videoId } }
            : { params: { q: this.q } })
            .then(res => {
              if (!this.videoId) {
                let video = res.data.items.shift()
                this.videoId = video.id.videoId
              }
              this.$cookie.set('videoId', this.videoId)
              this.videoIds = res.data.items.map(v => v.id.videoId)
            })
        } else {
          this.$axios.get('/videos', {
            params: {
              chart: 'mostPopular',
              regionCode: 'CA',
              part: 'snippet,contentDetails,statistics',
              videoCategoryId: ''
            }
          })
            .then(res => {
              let video = res.data.items.shift()
              this.videoId = video.id
              this.$cookie.set('videoId', this.videoId)
              this.videoIds = res.data.items.map(v => v.id)
            })
        }
      },

      updateQuery (q) {
        this.q = q
        this.videoId = ''
        this.fetchVideos()
      }

    }

  }
</script>
