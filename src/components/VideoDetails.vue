<template>
  <div class="videoDetails">
    <div class="heading">
      <h2>Video Title</h2>
      <h3>142,936 views</h3>
    </div>
    <div class="details">
      <div class="avatar">
        <img src="../assets/logo.png" alt="Avatar" width="30" height="30">
        <div class="author">
          The Author
        </div>
        <div class="publishDate">
          Published on January 3, 2018
        </div>
      </div>
      <div class="content">
        Some video description
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
