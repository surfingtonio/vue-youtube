<template>
  <nav class="navbar navbar-light bg-faded">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
      Vue Youtube
    </a>
    <form action="javascript:void(0)" class="form-inline">
      <div class="form-group">
        <input type="text" class="form-control mr-2" name="search" placeholder="Enter Search">
        <button class="btn btn-primary">
          <i class="fa fa-search"></i> Search
        </button>
      </div>
    </form>
  </nav>
</template>

<style scoped>
  .navbar {
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
  }
</style>
