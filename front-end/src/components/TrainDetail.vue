<script setup>
import { store } from '../store.js';
import CabControls from './CabControls.vue';

import { ref } from 'vue';

const props = defineProps({
  trainId: String,
  address: {
    type: String,
    default: '',
  },
});

const address = ref(props.trainId === 'new' ? props.address : props.trainId);
const addressLock = ref(address.value !== '' && props.trainId !== 'new');

const emit = defineEmits(['unlocked', 'updateNewDetail']);

const onTrainLockChange = () => {
  addressLock.value = !addressLock.value;
  if (addressLock.value) {
    store.addNewTrain(address.value);
  } else {
    emit('unlocked', { address: address.value });
    store.removeTrain(address.value);
  }
};
</script>

<template>
  <div class="address-control">
    <q-input v-model="address" label="Address" :disabled="!addressLock" />
    <q-btn
      :label="addressLock ? 'Release' : 'Set'"
      @click="onTrainLockChange"
      :disabled="address === ''"
    />
  </div>
  <template v-if="address !=='' && addressLock" >
    <CabControls class="train-controls" :address="address" />
  </template>
</template>

<style scoped>
  .train-controls {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
</style>
