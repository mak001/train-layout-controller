import Command from './Command';

/**
 * Command to control a DCC accessory (turn on/off)
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#a-addr-subaddr-activate-control-an-accessory-decoder-with-address-and-subaddress
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#a-linear-addr-activate-control-an-accessory-decoder-with-linear-address
 */
class ControlAccessoryCommand extends Command {
  /**
   * @param {number} address The address of the accessory to control. for linear addresses 1-2044, for address and sub address cobo 0-511
   * @param {import("../../enums.js").STATE} state The state to set the accessory to
   * @param {number} [subAddress] The sub address of the accessory to control. A number 0-3 for address and sub address combo, or null/undefined for linear addresses
   */
  constructor(address, state, subAddress) {
    if (subAddress === undefined && (address < 0 || address > 2044)) {
      throw new Error('Address must be between 0 and 2044 for linear addressing');
    }
    if (subAddress !== undefined && (address < 0 || address > 511)) {
      throw new Error('Address must be between 0 and 511 for address and sub address combo');
    }
    if (subAddress !== undefined && (subAddress < 0 || subAddress > 3)) {
      throw new Error('Sub address must be between 0 and 3');
    }
    super('a', address, subAddress, state);
  }
}

/**
 * Command to set the aspect of a DCC accessory
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#a-address-aspect-command-for-dcc-extended-accessories
 */
class SetAccessoryAspectCommand extends Command {
  /**
   * @param {number} address The address of the accessory to control. Must be between 1 and 2044
   * @param {number} aspect The aspect to set the accessory to
   */
  constructor(address, aspect) {
    if (address < 1 || address > 2044) {
      throw new Error('Address must be between 1 and 2044');
    }
    super('A', address, aspect);
  }
}

export {
  ControlAccessoryCommand,
  SetAccessoryAspectCommand,
};
