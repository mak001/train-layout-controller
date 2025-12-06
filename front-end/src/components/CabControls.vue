<script setup>
import { store } from '../store.js';

import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
});

const cabSpeed = ref(0);
const direction = ref(1);

onMounted(() => {
  if (props.address in store.layoutState.cabs) {
    cabSpeed.value = store.layoutState.cabs[props.address].speed;
    direction.value = store.layoutState.cabs[props.address].direction;
  }
});

watch(() => store.layoutState.cabs[props.address], (cab) => {
  if (cab) {
    cabSpeed.value = cab.speed;
    direction.value = cab.direction;
  }
});

const setCabSpeed = (newSpeed) => {
  store.dispatch('setCabSpeed', { cab: props.address, speed: newSpeed, direction: direction.value });
};
</script>

<template>
  <q-slider v-model="cabSpeed" :min="0" :max="126" :step="1" reverse vertical @change="setCabSpeed" />
</template>

<style scoped>

</style>
