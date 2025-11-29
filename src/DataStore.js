import { produce } from 'immer';
import { STATE, TRACK } from 'train-controller/enums';

export default class DataStore {
  static #controller;
  static #wsServer;

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

  static get wsServer() {
    return DataStore.#wsServer;
  }

  static set wsServer(wsServerInstance) {
    if (!DataStore.#wsServer) {
      DataStore.#wsServer = wsServerInstance;
    } else {
      console.error('cannot re-set wsServer once set');
    }
  }

  static update(draftUpdate) {
    DataStore.store = produce(DataStore.store, draftUpdate);
    if (DataStore.#wsServer) {
      DataStore.#wsServer.broadcast(JSON.stringify(DataStore.store));
    }
  }
}
