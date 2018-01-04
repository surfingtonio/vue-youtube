<template>
  <div class="videoPlayer" v-if="video">
    <span v-html="video.player.embedHtml"></span>
  </div>
</template>

<script>
  export default {
    name: 'videoPlayer',
    props: [ 'video' ]
  }
</script>

<style>
  .videoPlayer {
  }
</style>
