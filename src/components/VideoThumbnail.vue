<template>
  <div class="videoThumbnail clearfix">
    <img :alt="video.snippet.title"
         :src="video.snippet.thumbnails.medium.url"
         :width="168"
         class="pull-left mr-3">
    <h3 class="title">{{ video.snippet.title }}</h3>
    <div class="author">{{ video.snippet.channelTitle }}</div>
    <div class="views">{{ viewCount }} views</div>
  </div>
</template>

<script>
  export default {
    name: 'videoThumbnail',
    props: {
      video: { required: true }
    },

    computed: {

      viewCount () {
        if (this.video) {
          return parseInt(this.video.statistics.viewCount).toLocaleString()
        } else {
          return ''
        }
      }
    }

  }
</script>

<style scoped>
  .videoThumbnail {
    margin-bottom: .9rem;
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
