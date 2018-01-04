<template>
  <div id="app">
    <Navbar @searchEnter="updateQuery"/>
    <div class="container">
      <div class="row">
        <div class="col-md-8" v-if="video">
          <VideoPlayer :video="video"/>
          <VideoDetails :video="video"/>
        </div>
        <div class="col-md-4">
          <VideoList :videos="videos"/>
        </div>
      </div>
    </div>
  </div>
</template>
