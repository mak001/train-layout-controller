import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { enablePatches } from 'immer';

enablePatches();

const startWebSocket = (delay = 1000) => {
  const ws = new WebSocket(`ws://${window.location.hostname}:${80}`);

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = (event) => {
    console.log(event.data);
    const data = JSON.parse(event.data);
    console.log('Received data:', data);
    store.updateState(data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed, attempting to reconnect...');
    setTimeout(() => {
      startWebSocket(delay + 1000);
    }, delay);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

startWebSocket();
createApp(App)
  .use(store)
  .mount('#app');
