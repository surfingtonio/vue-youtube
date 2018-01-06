<template>
  <div class="videoThumbnail clearfix">
    <a :href="videoUrl" :title="video.snippet.title">
      <img :alt="video.snippet.title"
           :src="video.snippet.thumbnails.medium.url"
           :width="168"
           class="pull-left mr-3">
    </a>
    <a :href="videoUrl" :title="video.snippet.title">
      <h3 class="title">{{ video.snippet.title }}</h3>
      <div class="author">{{ video.snippet.channelTitle }}</div>
      <div class="views">{{ viewCount }} views</div>
    </a>
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
      },

      videoUrl () {
        return '/watch/' + this.video.id
      }

    }

  }
</script>

<style scoped>
  .videoThumbnail {
    margin-bottom: .9rem;
  }
  .videoThumbnail a {
    color: #000;
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
