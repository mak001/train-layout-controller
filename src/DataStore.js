import { produce } from 'immer';
import { STATE, TRACK } from 'train-controller/enums';

export default class DataStore {
  static #controller;

  static store = {
    power: {
      [TRACK.MAIN]: STATE.OFF,
      [TRACK.PROG]: STATE.OFF,
      [TRACK.JOIN]: false,
    },
  };

  get controller() {
    return DataStore.#controller;
  }

  set controller(controllerInstance) {
    if (!DataStore.#controller) {
      DataStore.#controller = controllerInstance;
    } else {
      console.error('cannot re-set controller once set');
    }
  }

  static update(draftUpdate) {
    DataStore.store = produce(DataStore.store, draftUpdate);
  }
}
