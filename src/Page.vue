<template>
  <div id="app">

    <!-- Navbar -->
    <Navbar @searchEnter="updateQuery"/>
    <!-- /Navbar -->

    <div class="container px-0">
      <div class="row no-gutters">
        <div class="col-lg-8">

          <Search class="d-block d-sm-none mb-4" @searchEnter="updateQuery" />

          <!-- videoPlayer -->
          <div class="videoPlayer">
            <VideoPlayer v-if="videoId" :videoId="videoId" :width="videoWidth" />
          </div>
          <!-- /.videoPlayer -->

          <!-- videoDetailsWrapper -->
          <div class="videoDetailsWrapper" v-if="videoId">
            <VideoDetails :videoId="videoId"/>
          </div>
          <!-- /.videoDetailsWrapper -->

        </div>
        <div class="col-lg-4">

          <!-- videoListWrapper -->
          <div class="videoListWrapper">
            <VideoList :videoIds="videoIds"/>
          </div>
          <!-- /.videoListWrapper -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import VideoPlayer from './components/VideoPlayer'
  import Search from './components/Search'
  import VideoDetails from './components/VideoDetails'
  import VideoList from './components/VideoList'

  export default {
    name: 'page',
    components: { Navbar, VideoPlayer, Search, VideoDetails, VideoList },

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
