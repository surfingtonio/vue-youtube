<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
      Vue YouTube
    </a>
    <yt-search class="d-none d-md-block" @searchEnter="$emit('searchEnter', $event)" />
  </nav>
</template>

<script>
  import YtSearch from './Search'

  export default {
    name: 'app-navbar',
    components: { YtSearch }
  }
</script>

<style scoped>
  .navbar {
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
  }
</style>
