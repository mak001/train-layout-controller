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
const functions = ref([]);

onMounted(() => {
  if (props.address in store.layoutState.cabs) {
    speed.value = store.layoutState.cabs[props.address].speed;
    direction.value = store.layoutState.cabs[props.address].direction;
    functions.value = store.layoutState.cabs[props.address].functions;
  }
});

watch(() => store.layoutState.cabs[props.address], (cab) => {
  if (cab) {
    speed.value = cab.speed;
    direction.value = cab.direction;
    functions.value = cab.functions;
  }
});

const getFunctionState = (func) => {
  return functions.value.length ? functions.value[func] : 0;
};

const setCabSpeed = (newSpeed) => {
  store.dispatch('setCabSpeed', { cab: props.address, speed: newSpeed, direction: direction.value });
};

const setCabDirection = (newDirection) => {
  store.dispatch('setCabSpeed', { cab: props.address, speed: speed.value, direction: newDirection });
};

const toggleCabFunction = (func) => {
  const state = functions.value.length ? functions.value[func] : 0;
  store.dispatch('setCabFunction', {
    cab: props.address,
    func,
    state: Number(!Number(state)), // makes a '0' a 1 and a '1' a 0
  });
};

let heldTimeouts = [];

const handleFunctionButtonHold = (event) => {
  console.log(event);
  const func = event.evt.target.closest('button').dataset.func.toUpperCase();
  if (heldTimeouts[func]) {
    clearTimeout(heldTimeouts[func]);
    heldTimeouts[func] = null;
  }

  heldTimeouts[func] = setTimeout(() => {
    store.dispatch('setCabFunction', { cab: props.address, func, state: 0 });
  }, 250);
  store.dispatch('setCabFunction', { cab: props.address, func, state: 1 });
};

</script>

<template>
  <div class="speed-dir-control">
    <q-btn-toggle v-model="direction" :options="[{ label: 'Forward', value: 1 }, { label: 'Reverse', value: 0 }]" @update:model-value="setCabDirection" />
    <q-slider v-model="speed" :min="0" :max="126" :step="1" reverse vertical @update:model-value="setCabSpeed" />
  </div>
  <div class="func-control">
    <q-btn label="Headlight" :color="getFunctionState('0') == 1 ? 'yellow' : 'grey'" @click="toggleCabFunction('0')" />
    <q-btn label="Bell" :color="getFunctionState('1') == 1 ? 'yellow' : 'grey'" @click="toggleCabFunction('1')" />
    <q-btn label="Horn" :color="getFunctionState('2') == 1 ? 'yellow' : 'grey'" v-touch-repeat:0:200:200.mouse.space="handleFunctionButtonHold" data-func="2"/>
    <!-- TODO the rest of the functions (4-32) -->
  </div>
</template>

<style scoped>
.speed-dir-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.func-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
</style>
