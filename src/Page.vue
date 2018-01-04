<template>
  <div id="app">
    <Navbar @searchEnter="updateQuery"/>
    <div class="container">
      <div class="row">
        <div class="col-md-8" v-if="video">
          <VideoPlayer :video="video"/>
          <VideoDetails :video="video"/>
        </div>
        <div class="col-md-4">
          <VideoList :videos="videos"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import VideoPlayer from './components/VideoPlayer'
  import VideoDetails from './components/VideoDetails'
  import VideoList from './components/VideoList'
  import Axios from 'axios'

  export default {
    name: 'page',
    components: { Navbar, VideoPlayer, VideoDetails, VideoList },

    data () {
      return {
        'q': 'samsung s8',
        'videoId': '',
        'video': '',
        'videos': []
      }
    },

    created () {
      this.fetchVideos()
    },

    methods: {

      fetchVideos () {
        Axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
            part: 'snippet',
            maxResults: 10,
            q: this.q
          }
        })
          .then(res => {
            this.videos = res.data.items
            this.videoId = this.videos[0].id.videoId

            Axios.get('https://www.googleapis.com/youtube/v3/videos', {
              params: {
                key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
                part: 'snippet,contentDetails,statistics,player',
                maxWidth: 730,
                id: this.videoId
              }
            })
              .then(res => {
                this.video = res.data.items[0]
              })
          })
      },

      updateQuery (q) {
        this.q = q
        this.fetchVideos()
      }

    }

  }
</script>
