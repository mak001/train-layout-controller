/**
 * Enum for track state
 * @readonly
 * @enum {number}
 */
const STATE = Object.freeze({
  OFF: '0',
  ON: '1',
});

/**
 * Enum for track types
 * ALL - sets the state for both the main and programming track
 * @readonly
 * @enum {string}
 */
const TRACK = Object.freeze({
  ALL: '',
  MAIN: 'MAIN',
  PROG: 'PROG',
  JOIN: 'JOIN',
});

/**
  * The direction a train should travel
  * @enum {number}
  * @readonly
  */
const DIRECTION = Object.freeze({
  REVERSE: 0,
  FORWARD: 1,
});

/**
 * Turntable activities
 * @enum {number}
 * @readonly
 */
const ACTIVITIES = Object.freeze({
  TURN: 0,
  TURN_PINVERT: 1,
  HOME: 2,
  CALIBRATE: 3,
  LED_ON: 4,
  LED_SLOW: 5,
  LED_FAST: 6,
  LED_OFF: 7,
  ACC_ON: 8,
  ACC_OFF: 9,
});

/**
 * Turnout states
 * @enum {string}
 * @readonly
 */
const TURNOUT_STATE = Object.freeze({
  THROWN: 'T',
  CLOSED: 'C',
  EXAMINE: 'X',
});

export { STATE, TRACK, DIRECTION, ACTIVITIES, TURNOUT_STATE };
