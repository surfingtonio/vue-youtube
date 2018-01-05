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
  import Axios from 'axios'

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
        let params = {
          key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
          type: 'video',
          part: 'snippet',
          maxResults: 10
        }
        if (this.videoId) {
          params = { ...params, relatedToVideoId: this.videoId }
        } else {
          params = { ...params, q: this.q }
        }

        Axios.get('https://www.googleapis.com/youtube/v3/search', { params })
          .then(res => {
            let video = res.data.items.shift()
            this.videoId = video.id.videoId
            this.videoIds = res.data.items.map(v => v.id.videoId)
          })
      },

      updateQuery (q) {
        this.q = q
        this.fetchVideos()
      }

    }
  }
</script>
