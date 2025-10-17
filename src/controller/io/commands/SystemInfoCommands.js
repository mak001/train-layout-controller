import Command from './Command';

/**
 * Command to request the current on the track
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#c-request-current-on-the-track-s
 */
class RequestCurrentOnTrackCommand extends Command {
  constructor() {
    super('c');
  }
}

/**
 * Command to request system information from the device. Also gets all the points/turnouts
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#s-request-the-dcc-ex-version-and-hardware-info-along-with-listing-defined-turnouts
 */
class RequestSystemInfoCommand extends Command {
  constructor() {
    super('s');
  }
}

/**
 * Command to request the maximum number of locos that can be controlled by the system
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#request-the-number-of-supported-cabs-locos
 */
class RequestMaxLocosCommand extends Command {
  constructor() {
    super('#');
  }
}

export default {
  RequestCurrentOnTrackCommand,
  RequestSystemInfoCommand,
  RequestMaxLocosCommand,
};
