import ResponseHandler from './ResponseHandler';
import { TRACK, STATE } from '../../enums';
import DataStore from '../../../DataStore';
/**
 * Handler for track power responses.
 */
export default class TrackPowerHandler extends ResponseHandler {
  static shouldHandle(response) {
    return response.startsWith('p');
  }

  static handle(response) {
    const parts = response.slice(1).split(' ');
    const state = parts[0] === STATE.OFF ? STATE.OFF : STATE.ON;

    if (parts.length === 1) {
      return DataStore.update((draft) => {
        draft.power = {
          [TRACK.MAIN]: state,
          [TRACK.PROG]: state,
          [TRACK.JOIN]: STATE.OFF,
        };
      });
    }

    const track = Object.keys(TRACK).find(key => TRACK[key] === parts[1]);
    return DataStore.update((draft) => {
      draft.power = {
        [track]: state,
      };
    });
  }
}
