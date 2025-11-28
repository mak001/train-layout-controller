import { produce } from 'immer';
import { STATE, TRACK } from './controller/enums';

const baseState = {
  power: {
    [TRACK.MAIN]: STATE.OFF,
    [TRACK.PROG]: STATE.OFF,
    [TRACK.JOIN]: false,
  },
};

export default class DataStore {
  static dataStore = null;

  static get store() {
    if (!DataStore.dataStore) {
      DataStore.dataStore = baseState;
    }
    return DataStore.dataStore;
  }

  static update(draftUpdate) {
    DataStore.dataStore = produce(DataStore.dataStore, draftUpdate);
  }
}
