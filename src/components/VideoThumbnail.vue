<template>
  <div class="videoThumbnail clearfix">
    <a class="pull-left mr-3" :href="videoUrl" :title="video.snippet.title">
      <img :alt="video.snippet.title"
           :src="video.snippet.thumbnails.medium.url"
           :width="168">
      <div class="videoDuration">{{ videoDuration }}</div>
    </a>
    <a :href="videoUrl" :title="video.snippet.title">
      <h3 class="title">{{ truncateTitle(video.snippet.title, 36) }}</h3>
      <div class="author">{{ video.snippet.channelTitle }}</div>
      <div class="views">{{ viewCount }} views</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'yt-video-thumbnail',
    props: {
      video: { required: true }
    },

    methods: {

      truncateTitle (title, chars) {
        let pattern = new RegExp('^(.{' + chars + '}[^\\s]*).*')
        return title.replace(pattern, '$1')
      }

    },

    computed: {

      viewCount () {
        return parseInt(this.video.statistics.viewCount).toLocaleString()
      },

      videoUrl () {
        return '/watch/' + this.video.id
      },

      videoDuration () {
        let trim = this.video.contentDetails.duration.indexOf('M') === -1 ? { trim: 'mid' } : { trim: 'large' }
        return this.$moment.duration(this.video.contentDetails.duration).format('h:mm:ss', trim)
      }

    }

  }
</script>

<style scoped>
  .videoThumbnail {
    margin-bottom: .9rem;
  }
  .videoThumbnail a {
    position: relative;
    color: #000;
  }
  .videoThumbnail .videoDuration {
    opacity: .7;
    background: #000;
    color: #fff;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: .78rem;
    font-weight: 700;
    padding: 0 .2rem;
    position: absolute;
    right: 2%;
    bottom: 3%;
  }
  .videoThumbnail a:hover {
    text-decoration: none;
  }
  h3.title {
    font-size: .9rem;
    margin: 0;
  }
  div.author {
    font-size: .9em;
    color: #888;
  }
  div.views {
    font-size: .9em;
    color: #888;
  }
</style>
