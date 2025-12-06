<script setup>
import { store } from '../store.js';

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

import { defineEmits } from 'vue';
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
  <div class="train-controls" v-if="address !=='' && addressLock">
    <!-- Additional train controls can be added here -->
     TRAIN
  </div>
</template>
