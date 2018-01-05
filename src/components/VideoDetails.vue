<template>
  <div class="videoDetails" v-if="video">
    <div class="heading">
      <h2>{{ video.snippet.title }}</h2>
      <div class="viewCount">{{ viewCount }} views</div>
    </div>
    <div class="details">
      <img width="48" height="48" class="avatar pull-left rounded-circle mr-2"
           :alt="channel.snippet.title"
           :src="channel.snippet.thumbnails.medium.url"
           v-if="channel">
      <h3 class="author">
        {{ video.snippet.channelTitle }}
      </h3>
      <div class="publishedAt">
        {{ video.snippet.publishedAt }}
      </div>
      <div class="content" v-html="videoDescription"></div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'videoDetails',
    props: [ 'video' ],

    data () {
      return {
        channel: ''
      }
    },

    created () {
      this.fetchChannel()
    },

    methods: {

      fetchChannel () {
        if (!this.video) return

        Axios.get('https://www.googleapis.com/youtube/v3/channels', {
          params: {
            key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
            part: 'snippet',
            id: this.video.snippet.channelId
          }
        })
          .then(res => {
            this.channel = res.data.items[0]
          })
      }

    },

    computed: {

      viewCount () {
        if (this.video) {
          return parseInt(this.video.statistics.viewCount).toLocaleString()
        } else {
          return ''
        }
      },

      videoDescription () {
        if (this.video) {
          return this.video.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
        } else {
          return ''
        }
      }

    },

    watch: {

      video () {
        this.fetchChanel()
      }

    }

  }
</script>

<style scoped>
  .videoDetails {
    padding: 1rem 0;
  }
  .heading {
    padding: .5rem 0;
  }
  h2 {
    font-size: 1.3rem;
  }
  .viewCount {
    font-size: 1rem;
    font-weight: 100;
    color: #888;
  }
  .details {
    padding: .5rem 0;
  }
  .avatar {}
  .author {
    font-size: 1rem;
    margin: 0;
  }
  .publishedAt {
    color: #888;
    font-size: .8rem;
  }
  .content {
    font-size: 1rem;
    padding: 1rem 0;
  }
</style>
