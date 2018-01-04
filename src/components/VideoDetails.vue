<template>
  <div class="videoDetails">
    <div class="heading">
      <h2>{{ video.snippet.title }}</h2>
      <h3>{{ video.statistics.viewCount }} views</h3>
    </div>
    <div class="details">
      <div class="avatar">
        <img src="../assets/logo.png" alt="Avatar" width="30" height="30" class="pull-left">
        <div class="author">
          {{ video.snippet.channelTitle }}
        </div>
        <div class="publishDate">
          {{ video.snippet.publishedAt }}
        </div>
      </div>
      <div class="content">
        {{ video.snippet.description }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'videoDetails',
    props: [ 'video' ]
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
  h3 {
    font-size: 1rem;
    font-weight: 100;
    color: #888;
  }
  .details {
    padding: .5rem 0;
  }
  .avatar {}
  .content {
    padding: .5rem 0;
  }
</style>
