import { reactive } from 'vue';
import { applyPatches } from 'immer';

export const store = reactive({
  layoutState: {
    power: {
      MAIN: 0,
      PROG: 0,
    },
  },
  state: {
    connected: false,
    trains: new Set([]),
    currentTrainTab: 'new',
  },
  _ws: null,
  updateLayoutState(data) {
    const { patches } = data;
    if (!patches) {
      this.layoutState = data;
      return;
    }
    this.layoutState = applyPatches(this.layoutState, patches);
    console.log(this.layoutState);
  },
  updateConnectedStatus(status) {
    console.log('Updating connected status to:', status);
    this.state.connected = status;
  },
  getTrain(address) {
    return this.state.trains.find(train => train.id === address);
  },
  addNewTrain(address) {
    this.state.trains.add(address);
    this.state.currentTrainTab = address;
  },
  removeTrain(trainId) {
    console.log('removing train: ', trainId);
    const removed = this.state.trains.delete(trainId);
    if (removed && this.state.currentTrainTab === trainId) {
      this.state.currentTrainTab = 'new';
    }
  },
  dispatch(action, payload) {
    switch (action) {
      case 'setPowerState':
        console.log('sending to ws:', payload);
        this._ws.send(JSON.stringify({
          power: payload,
        }));
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  },
});
