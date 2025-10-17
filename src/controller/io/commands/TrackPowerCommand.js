import Command from './Command';

/**
 * A command to turn on or off the power to tracks
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#onoff-track-turn-power-on-or-off-to-the-main-and-prog-tracks
 */
export default class TrackPowerCommand extends Command {
  /**
 * Enum for track state
 * @readonly
 * @static
 * @enum {number}
 */
  static STATE = Object.freeze({
    OFF: '0',
    ON: '1',
  });

  /**
 * Enum for track types
 * ALL - sets the state for both the main and programming track
 * @readonly
 * @static
 * @enum {string}
 */
  static TRACK = Object.freeze({
    ALL: '',
    MAIN: 'MAIN',
    PROG: 'PROG',
    JOIN: 'JOIN',
  });

  /**
 *
 * @param {TrackPowerCommand.TRACK} track - The track to turn on or off
 * @param {TrackPowerCommand.STATE} state - The on/off state of the track
 */
  constructor(track, state) {
    if (track === TrackPowerCommand.TRACK.ALL) {
      super(state);
    } else if (state === TrackPowerCommand.STATE.OFF && track === TrackPowerCommand.TRACK.JOIN) {
      super(TrackPowerCommand.STATE.OFF, track);
      console.warn('Turning off a JOIN is not valid, use `STATE.ON` to toggle');
      return;
    } else {
      super (state, track);
    }
  }
}
