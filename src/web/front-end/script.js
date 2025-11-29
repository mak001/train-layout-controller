const ws = new WebSocket(`ws://${window.location.host}`);

ws.onopen = () => {
  console.log('WebSocket connection established');
};

ws.onmessage = (event) => {
  console.log(event.data);
  const data = JSON.parse(event.data);
  console.log('Received data:', data);
  // TODO - update based on recieved data
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
