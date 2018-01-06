<template>
  <div id="app">
    <Navbar @searchEnter="updateQuery"/>
    <div class="container">
      <div class="row">
        <div class="col-md-8" v-if="videoId">
          <VideoPlayer :videoId="videoId"/>
        </div>
        <div class="col-md-4">
          <VideoList :videoIds="videoIds"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import VideoPlayer from './components/VideoPlayer'
  import VideoList from './components/VideoList'

  export default {
    name: 'page',
    components: { Navbar, VideoPlayer, VideoList },

    data () {
      return {
        'q': 'samsung s8',
        'videoId': this.$route.params.id || '',
        'videoIds': []
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
