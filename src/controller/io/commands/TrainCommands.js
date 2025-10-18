import Command from './Command';

/**
 * Gets train info, also starts a reminder process for updates to the train
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#t-cab-request-a-deliberate-update-on-the-cab-loco-speed-functions
 */
class TrainInfoCommand extends Command {
  /**
     * @param {string|number} cab The train to get
     */
  constructor(cab) {
    super('t', cab);
  }
}

/**
 * sets a train's speed, also starts a reminder process for updates to the train
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#t-cab-speed-dir-set-cab-loco-speed
 */
class SetTrainSpeedCommand extends Command {
  /**
   * @param {string|number} cab The train to set speed for
   * @param {int} speed The speed to set the train (0 to 127, or -1 for emergency stop)
   * @param {import("../../enums.js").DIRECTION} direction The direction the train should go
   */
  constructor(cab, speed, direction) {
    const clampedSpeed = SetTrainSpeedCommand.clamp(speed, -1, 127);
    super('t', cab, clampedSpeed, direction);
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}

/**
 * Stops all trains in the reminders list
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#id71
 */
class EmergenyStopCommand extends Command {
  constructor() {
    super('!');
  }
}

/**
 * Sets a function on the train
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#f-cab-funct-state-turn-loco-decoder-functions-on-or-off
 */
class TrainFunctionCommand extends Command {
  /**
   * @param {string|number} cab The train to set the function state for
   * @param {number} funct The function to set (must be between 0 and 68, inclusive)
   * @param {import("../../enums.js").STATE} state The state to set the function
   */
  constructor(cab, funct, state) {
    if (funct < 0 || 68 < funct) {
      throw new Error(`function number is out of range (${funct})`);
    }
    super('F', cab, funct, state);
  }
}

/**
 * Removes train reminders
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#cab-remove-one-or-all-locos-from-reminders
 */
class RemoveTrainReminder extends Command {
  /**
   * @param {string|number} [cab] The train to forget. If no train is passed it will forget all trains.
   */
  constructor(cab) {
    super('-', cab);
  }
}

export {
  TrainInfoCommand,
  SetTrainSpeedCommand,
  EmergenyStopCommand,
  TrainFunctionCommand,
  RemoveTrainReminder,
};
