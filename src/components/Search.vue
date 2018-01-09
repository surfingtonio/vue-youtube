<template>
  <form class="navbar-right" @submit="searchEnter($event)">
    <div class="input-group px-2">
      <input type="text" class="form-control" name="search" placeholder="Search" v-model="q">
      <span class="input-group-btn">
        <button class="btn btn-success" type="submit">
          <i class="fa fa-search"></i>
        </button>
      </span>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'search',

    data () {
      return {
        q: ''
      }
    },

    methods: {
      searchEnter (ev) {
        this.$emit('searchEnter', this.q)
        this.q = ''
        ev.preventDefault()
      }
    }
  }
</script>
