import ResponseHandler from './ResponseHandler';
import { TRACK } from '../../enums';
/**
 * Handler for track power responses.
 */
export default class TrackPowerHandler extends ResponseHandler {
  static shouldHandle(response) {
    return response.startsWith('p');
  }

  static handle(response) {
    const parts = response.split(' ');
    const status = parts[0].replace('p', '');
    const track = parts[1] ? parts[1] : TRACK.ALL_TRACKS;
    console.log(`Track Power Response Handled: Track: ${track}, Status = ${status}`);
  }
}
