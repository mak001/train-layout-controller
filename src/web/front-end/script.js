const mainLinePowerToggle = document.getElementById('main-power-toggle');
const programmingTrackPowerToggle = document.getElementById('programming-power-toggle');
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onopen = () => {
  console.log('WebSocket connection established');
};

ws.onmessage = (event) => {
  console.log(event.data);
  const data = JSON.parse(event.data);
  console.log('Received data:', data);

  if (Object.prototype.hasOwnProperty.call(data, 'power')) {
    if (Object.prototype.hasOwnProperty.call(data.power, 'MAIN') && Object.prototype.hasOwnProperty.call(data.power, 'PROG')) {
      mainLinePowerToggle.checked = data.power.MAIN == 1;
      programmingTrackPowerToggle.checked = data.power.PROG == 1;
    } else if (Object.prototype.hasOwnProperty.call(data.power, 'MAIN')) {
      mainLinePowerToggle.checked = data.power.MAIN == 1;
      programmingTrackPowerToggle.checked = false;
    } else if (Object.prototype.hasOwnProperty.call(data.power, 'PROG')) {
      mainLinePowerToggle.checked = false;
      programmingTrackPowerToggle.checked = data.power.PROG == 1;
    }
  }
  // TODO - update based on recieved data
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

mainLinePowerToggle.addEventListener('change', () => {
  const message = {
    power: {
      MAIN: Number(mainLinePowerToggle.checked),
    },
  };
  ws.send(JSON.stringify(message));
});

programmingTrackPowerToggle.addEventListener('change', () => {
  const message = {
    power: {
      PROG: Number(programmingTrackPowerToggle.checked),
    },
  };
  ws.send(JSON.stringify(message));
});
