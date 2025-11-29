import express from 'express';

import DataStore from 'train-controller/DataStore';
import { TRACK, STATE } from 'train-controller/enums';
import TrackPowerCommand from 'train-controller/controller/io/commands/TrackPowerCommand';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(DataStore.store.power);
});

router.post('/', async (req, res) => {
  const { track, state } = req.body;
  if (track === undefined || state === undefined) {
    res.status(400);
    res.json({ success: false, message: 'missing track or state in request body' });
    return;
  }

  if (track === TRACK.JOIN && state == STATE.OFF) {
    res.status(400);
    res.json({ success: false, message: 'cannot turn off a join, use a programming command instead' });
    return;
  }

  const result = await DataStore.controller.sendCommand(
    new TrackPowerCommand(req.body.track, req.body.state),
  );
  res.json({ success: true, result });
});

export default router;
