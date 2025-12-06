<script setup>
import { store } from '../store.js';

import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
});

const speed = ref(0);
const direction = ref(1);

onMounted(() => {
  if (props.address in store.layoutState.cabs) {
    speed.value = store.layoutState.cabs[props.address].speed;
    direction.value = store.layoutState.cabs[props.address].direction;
  }
});

watch(() => store.layoutState.cabs[props.address], (cab) => {
  if (cab) {
    speed.value = cab.speed;
    direction.value = cab.direction;
  }
});

const setCabSpeed = (newSpeed) => {
  store.dispatch('setCabSpeed', { cab: props.address, speed: newSpeed, direction: direction.value });
};

const setCabDirection = (newDirection) => {
  store.dispatch('setCabSpeed', { cab: props.address, speed: speed.value, direction: newDirection });
};
</script>

<template>
  <q-btn-toggle v-model="direction" :options="[{ label: 'Forward', value: 1 }, { label: 'Reverse', value: 0 }]" @update:model-value="setCabDirection" />
  <q-slider v-model="speed" :min="0" :max="126" :step="1" reverse vertical @update:model-value="setCabSpeed" />
</template>

<style scoped>

</style>
