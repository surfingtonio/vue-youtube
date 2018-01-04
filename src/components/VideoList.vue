<template>
  <div class="videoList">
    <div class="row">
      <div class="videoItem">
        <div class="col-12">
          <div class="thumbnail"></div>
        </div>
        <div class="col-12">
          <h3 class="title">Video Title</h3>
          <div class="author">The Author</div>
          <div class="views">1.1M views</div>
        </div>
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
        background: #000;
        width: 150px;
        height: 100px;
      }
        .title {
          font-size: 1rem;
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
