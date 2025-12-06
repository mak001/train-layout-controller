<script setup>
import { store } from '../store.js';
import { useTemplateRef, watch, onMounted } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';

const mainPowerSwitch = useTemplateRef('mainPowerSwitch');
const progPowerSwitch = useTemplateRef('progPowerSwitch');

onMounted(() => {
  updateCheckboxState(mainPowerSwitch, store.layoutState.power.MAIN);
  updateCheckboxState(progPowerSwitch, store.layoutState.power.PROG);
});

watch(() => store.layoutState.power, (newVal) => {
  updateCheckboxState(mainPowerSwitch, newVal.MAIN);
  updateCheckboxState(progPowerSwitch, newVal.PROG);
}, { deep: true });

const updateCheckboxState = (ref, state) => {
  const childNodes = ref.value.$el.childNodes;
  const inputNode = Array.from(childNodes).find(child => child.nodeName === 'INPUT');
  if (inputNode) {
    if (inputNode.checked != state) {
      inputNode.checked = state == 1 ? true : false;
      inputNode.dispatchEvent(new CustomEvent('change', { detail: 'skip-dispatch' }));
    }
  }
};

const updatePowerState = (rail, event) => {
  if (event.detail === 'skip-dispatch') return;
  store.dispatch('setPowerState', { [rail]: event.target.checked ? 1 : 0 });
};
</script>

<template>
  <h2>Power Control</h2>
  <ToggleSwitch :true-value="1" :false-value="0" @change="updatePowerState('MAIN', $event)" ref="mainPowerSwitch"/>
  <ToggleSwitch :true-value="1" :false-value="0" @change="updatePowerState('PROG', $event)" ref="progPowerSwitch"/>
</template>
