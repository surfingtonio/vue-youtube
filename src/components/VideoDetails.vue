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
        Published {{ publishedAt }}
      </div>
      <div class="content" v-html="videoDescription"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yt-video-details',
    props: {
      videoId: {
        required: true
      }
    },

    data () {
      return {
        video: '',
        channel: ''
      }
    },

    created () {
      this.fetchVideo()
    },

    methods: {

      fetchChannel () {
        if (!this.video) return

        this.$axios.get('/channels', {
          params: {
            id: this.video.snippet.channelId
          }
        })
          .then(res => {
            this.channel = res.data.items[0]
          })
      },

      fetchVideo () {
        if (!this.videoId) return

        this.$axios.get('/videos', {
          params: {
            part: 'snippet,statistics',
            id: this.videoId
          }
        })
          .then(res => {
            this.video = res.data.items[0]
          })
      }

    },

    computed: {

      viewCount () {
        return parseInt(this.video.statistics.viewCount).toLocaleString()
      },

      videoDescription () {
        let desc = this.$linkifyHtml(this.video.snippet.description)
        return desc.replace(/(?:\r\n|\r|\n)/g, '<br />')
      },

      publishedAt () {
        return this.$moment(this.video.snippet.publishedAt).fromNow()
      }

    },

    watch: {

      video () {
        this.fetchChannel()
      }

    }

  }
</script>

<style scoped>
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
