<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
      Vue YouTube
    </a>
    <Search class="d-none d-sm-block" @searchEnter="$emit('searchEnter', $event)"/>
  </nav>
</template>

<script>
  import Search from './Search'

  export default {
    name: 'app-navbar',
    components: { Search }
  }
</script>

<style scoped>
  .navbar {
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
  }
</style>
