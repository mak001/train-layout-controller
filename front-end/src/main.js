import { enablePatches } from 'immer';
import { Quasar } from 'quasar';
import { createApp } from 'vue';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import { store } from './store';
import router from './views/router';

enablePatches();

const startWebSocket = (delay = 1000) => {
  const ws = new WebSocket(`ws://${window.location.hostname}:${80}`);

  ws.onopen = () => {
    console.log('WebSocket connection established');
    store.updateConnectedStatus(true);
    store._ws = ws;
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    store.updateLayoutState(data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed, attempting to reconnect...');
    store.updateConnectedStatus(false);
    setTimeout(() => {
      startWebSocket(delay + 1000);
    }, delay);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

window.disconnect = () => {
  store.updateConnectedStatus(false);
};

startWebSocket();
createApp(App)
  .use(Quasar)
  .use(store)
  .use(router)
  .mount('#app');
