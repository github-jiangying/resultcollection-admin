<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
#app, body, h1, h2, h3, h4, h5, h6, html, li, p, ul {
  margin: 0;
  padding: 0;
}

  html,body{
    width: 100%;
    height: 100%;
  }
</style>
