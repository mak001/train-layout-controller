
<script setup>
import { store } from '../store.js';
import TrainDetail from '../components/TrainDetail.vue';
import { ref } from 'vue';

const newTrainDetail = ref({ address: '' });

function handleUnlocked(detail) {
  newTrainDetail.value = detail;
}
</script>

<template>
  <q-tabs v-model="store.state.currentTrainTab">
    <template v-for="train in store.state.trains" :key="train">
      <q-tab :name="train" :label="train" />
    </template>
    <q-tab name="new" label="New" />
  </q-tabs>

  <q-tab-panels v-model="store.state.currentTrainTab">
    <template v-for="train in store.state.trains" :key="train">
      <q-tab-panel :name="train">
        <TrainDetail :trainId="train" @unlocked="handleUnlocked" />
      </q-tab-panel>
    </template>
    <q-tab-panel name="new">
      <TrainDetail :trainId="'new'" :address="newTrainDetail.address" />
    </q-tab-panel>
  </q-tab-panels>
</template>
