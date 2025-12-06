<script setup>
import { store } from '../store.js';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import TrainDetails from '../components/TrainDetails.vue';
</script>

<template>
  <Tabs value="0" scrollable>
    <TabList>
      <Tab v-for="train in store.state.trains" :key="train.id" :value="train.id">
        {{ train.name }}
      </Tab>
    </TabList>
    <TabPanels v-if="store.state.trains.length">
      <TabPanel v-for="train in store.state.trains" :key="train.id" :value="train.id">
        <TrainDetails :trainId="train.id" />
      </TabPanel>
    </TabPanels>
    <TabPanels v-else>
      <TabPanel value="0">
        <TrainDetails :trainId="0" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
