import { produce } from 'immer';
import { STATE, TRACK } from 'train-controller/enums';

export default class DataStore {
  static #controller;
  static #server;

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

  static get server() {
    return DataStore.#server;
  }

  static set server(serverInstance) {
    if (!DataStore.#server) {
      DataStore.#server = serverInstance;
    } else {
      console.error('cannot re-set server once set');
    }
  }

  static update(draftUpdate) {
    DataStore.store = produce(DataStore.store, draftUpdate);
    if (DataStore.#server) {
      const draft = produce({}, draftUpdate);
      DataStore.#server.broadcast(draft);
    }
  }
}
