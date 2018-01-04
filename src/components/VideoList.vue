<template>
  <div class="videoList">
    <div class="row videoItem" v-for="video in videos">
        <div class="col-12">
          <img :alt="video.snippet.title"
               :src="video.snippet.thumbnails.medium.url"
               :width="168"
                class="pull-left mr-3">
          <h3 class="title">{{ video.snippet.title }}</h3>
          <div class="author">{{ video.snippet.channelTitle }}</div>
          <!--<div class="views">{{ video.statistics.viewCount }} views</div>-->
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'videoList',
    props: [ 'videos' ]
  }
</script>

<style scoped>
  .videoList {}
    .videoItem {
      margin-bottom: 1.5rem;
    }
      .thumbnail {
      }
        .title {
          font-size: 1rem;
          margin: 0;
        }
        .author {
          font-size: .9em;
          color: #888;
        }
        .views {
          font-size: .9em;
          color: #888;
        }
</style>
