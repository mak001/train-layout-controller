import { reactive } from 'vue';
import { applyPatches } from 'immer';

export const store = reactive({
  layoutState: {
    power: {
      MAIN: 0,
      PROG: 0,
    },
    cabs: {},
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
    console.log(patches);
    this.layoutState = applyPatches(this.layoutState, patches);
    console.log(this.layoutState);
  },
  updateConnectedStatus(status) {
    this.state.connected = status;
  },
  addNewTrain(address) {
    this.state.trains.add(address);
    this.state.currentTrainTab = address;
  },
  removeTrain(trainId) {
    const removed = this.state.trains.delete(trainId);
    if (removed && this.state.currentTrainTab === trainId) {
      this.state.currentTrainTab = 'new';
    }
  },
  dispatch(action, payload) {
    const data = { [action]: payload };
    console.log('sending to ws:', data);
    this._ws.send(JSON.stringify(data));
  },
});
