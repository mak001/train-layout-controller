<script setup>
import { store } from './store.js';

import NavBar from './components/NavBar.vue';
</script>

<template>
  <q-inner-loading label="Connecting..." :showing="store.state.connected === false" />
  <nav>
    <NavBar />
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  padding: 10px;
}

.q-inner-loading {
  z-index: 9999;
}
</style>
