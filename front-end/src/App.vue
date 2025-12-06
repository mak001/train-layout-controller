<script setup>
import { store } from './store.js';

import ProgressSpinner from 'primevue/progressspinner';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="spinner-connecting" :class="{ shown: store.state.connected === false }">
    <div>
      <p>Connecting...</p>
      <ProgressSpinner aria-label="connecting" />
    </div>
  </div>
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

.spinner-connecting {
  display: none;
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-connecting.shown {
  display: block;
}

.spinner-connecting > div {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}
</style>
