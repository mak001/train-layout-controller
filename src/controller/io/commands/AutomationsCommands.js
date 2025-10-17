import Command from './Command';

/**
 * Command to request automation(s) from the device.
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-a-request-a-list-of-automations-routes
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-a-id-ja-id-request-information-for-a-route-automation
 */
class RequestAutomationCommand extends Command {
  /**
   * @param {string|number} [id] The automation ID. If not provided, all automations will be requested.
   */
  constructor(id) {
    super('J A', id);
  }
}

// TODO: Implement other automation commands.
// https://dcc-ex.com/exrail/getting-started.html
// https://dcc-ex.com/exrail/exrail-command-reference.html

export default {
  RequestAutomationCommand,
};
