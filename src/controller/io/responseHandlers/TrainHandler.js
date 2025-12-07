import ResponseHandler from './ResponseHandler';
import DataStore from 'train-controller/DataStore';
import { DIRECTION } from 'train-controller/enums';

export default class TrainHandler extends ResponseHandler {
  static shouldHandle(message) {
    return message.startsWith('l');
  }

  static handle(message) {
    const parts = message.slice(2).split(' ');
    const cabId = parts[0];
    // 1 is reg
    const speedByte = parseInt(parts[2], 10);
    const functions = (parseInt(parts[3], 10) >>> 0).toString(2).padStart(29, '0').split('').reverse();

    const { speed, direction } = TrainHandler.getSpeedAndDirection(speedByte);
    return DataStore.update((draft) => {
      if (!draft.cabs) {
        draft.cabs = {};
      }

      if (!draft.cabs[cabId]) {
        draft.cabs[cabId] = {
          speed,
          direction,
          functions,
        };
        return;
      }

      draft.cabs[cabId].speed = speed;
      draft.cabs[cabId].direction = direction;
      draft.cabs[cabId].functions = functions;
    });
  }

  static getSpeedAndDirection(speed) {
    if (speed === 0 || speed === 1) {
      return { speed: 0, direction: DIRECTION.REVERSE };
    }

    if (speed === 128 || speed === 129) {
      return { speed: 0, direction: DIRECTION.FORWARD };
    }

    if (2 <= speed && speed <= 127) {
      return { speed: speed - 1, direction: DIRECTION.REVERSE };
    }

    if (130 <= speed && speed <= 255) {
      return { speed: speed - 129, direction: DIRECTION.FORWARD };
    }
    return {};
  }
};
