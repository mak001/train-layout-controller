import Command from './Command';
import { STATE, TRACK } from '../../enums.js';

/**
 * A command to turn on or off the power to tracks
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#onoff-track-turn-power-on-or-off-to-the-main-and-prog-tracks
 */
export default class TrackPowerCommand extends Command {
  /**
   *
   * @param {TRACK} track - The track to turn on or off
   * @param {STATE} state - The on/off state of the track
   */
  constructor(track, state) {
    if (track === TRACK.ALL) {
      super(state);
    } else if (state === STATE.OFF && track === TRACK.JOIN) {
      super(STATE.OFF, track);
      console.warn('Turning off a JOIN is not valid, use `STATE.ON` to toggle');
      return;
    } else {
      super (state, track);
    }
  }
}
