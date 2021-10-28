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

<style lang="scss">
@import "tippy.js/themes/light.css";
@import "tippy.js/themes/light-border.css";
@import "tippy.js/themes/google.css";
@import "tippy.js/themes/translucent.css";
@import 'animate.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
