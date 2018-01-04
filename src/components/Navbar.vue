<template>
  <nav class="navbar navbar-light bg-faded">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
      Vue YouTube
    </a>
    <form action="javascript:void(0)" class="form-inline">
      <div class="form-group">
        <input type="text" class="form-control mr-2" name="search" placeholder="Search" v-model="q">
        <button class="btn btn-success" @click="searchEnter">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </form>
  </nav>
</template>

<script>
  export default {

    data () {
      return {
        q: ''
      }
    },

    methods: {
      searchEnter () {
        this.$emit('searchEnter', this.q)
        this.q = ''
      }
    }

  }
</script>

<style scoped>
  .navbar {
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
  }
</style>
