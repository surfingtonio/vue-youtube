// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import moment from 'moment'
import linkifyHtml from 'linkifyjs/html'

Object.defineProperties(Vue.prototype, {
  $axios: {
    get: function () {
      return axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
          key: 'AIzaSyDYBfUyaiZo8V4SQxVBy3JESguMwRa-0Cs',
          type: 'video',
          part: 'snippet',
          maxResults: 10
        }
      })
    }
  },
  $moment: {
    get: function () {
      return moment
    }
  },
  $linkifyHtml: {
    get: function () {
      return linkifyHtml
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
