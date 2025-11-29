import express from 'express';

import DataStore from 'train-controller/DataStore';
import { TURNOUT_STATE } from 'train-controller/enums';
import { ThrowTurnoutCommand, ListTurnoutsCommand } from 'train-controller/controller/io/commands/TurnoutCommands';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(DataStore.store.turnouts);
});

router.post('/list', async (req, res) => {
  const result = await DataStore.controller.sendCommand(
    new ListTurnoutsCommand(),
  );
  res.json({ success: true, result });
});

router.post('/', async (req, res) => {
  const { id, state } = req.body;
  if (id === undefined || state === undefined) {
    res.status(400);
    res.json({ success: false, message: 'missing id or state in request body' });
    return;
  }

  if (!Object.values(TURNOUT_STATE).includes(state)) {
    res.status(400);
    res.json({ success: false, message: 'invalid turnout state' });
    return;
  }

  const result = await DataStore.controller.sendCommand(
    new ThrowTurnoutCommand(req.body.id, req.body.state),
  );
  res.json({ success: true, result });
});

export default router;
