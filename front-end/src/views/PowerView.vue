<script setup>
import { store } from '../store.js';
import { ref, watch, onMounted } from 'vue';

const mainPowerToggle = ref(store.layoutState.power.MAIN);
const progPowerToggle = ref(store.layoutState.power.PROG);

onMounted(() => {
  mainPowerToggle.value = store.layoutState.power.MAIN;
  progPowerToggle.value = store.layoutState.power.PROG;
});

watch(() => store.layoutState.power, (newVal) => {
  mainPowerToggle.value = newVal.MAIN == 1;
  progPowerToggle.value = newVal.PROG == 1;
});

const updatePowerState = (rail, event) => {
  if (event.detail === 'skip-dispatch') return;
  store.dispatch('setPowerState', { [rail]: event ? '1' : '0' });
};
</script>

<template>
  <div>
    <h2>Power Control</h2>
    <q-toggle v-model="mainPowerToggle" label="Main Power" @update:model-value="updatePowerState('MAIN', $event)" />
    <q-toggle v-model="progPowerToggle" label="Programming Power" @update:model-value="updatePowerState('PROG', $event)" />
  </div>
</template>
