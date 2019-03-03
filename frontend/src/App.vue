<template>
  <div id="app">
    <SimpleApplication />
  </div>
</template>

<script>
import SimpleApplication from './components/SimpleApplication.vue'

export default {
  name: 'app',
  components: {
    SimpleApplication
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
