import express from 'express';

import DataStore from 'train-controller/DataStore';
import { DIRECTION } from 'train-controller/enums';
import { TrainInfoCommand, EmergenyStopCommand, SetTrainSpeedCommand, TrainFunctionCommand } from 'train-controller/controller/io/commands/TrainCommands';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(DataStore.store.trains);
});

router.get('/stop', async (req, res) => {
  const result = await DataStore.controller.sendCommand(
    new EmergenyStopCommand(),
  );
  res.json({ success: true, result });
});

router.get('/:cab', async (req, res) => {
  const { cab } = req.params;
  const result = await DataStore.controller.sendCommand(
    new TrainInfoCommand(cab),
  );
  res.json({ success: true, result });
});

router.post('/:cab/speed', async (req, res) => {
  const { cab } = req.params;
  const { speed, direction } = req.body;
  if (speed === undefined || direction === undefined) {
    res.status(400);
    res.json({ success: false, message: 'missing speed or direction in request body' });
    return;
  }

  if (!Object.values(DIRECTION).includes(direction)) {
    res.status(400);
    res.json({ success: false, message: 'invalid direction' });
    return;
  }

  const result = await DataStore.controller.sendCommand(
    new SetTrainSpeedCommand(cab, speed, direction),
  );
  res.json({ success: true, result });
});

router.post('/:cab/func', async (req, res) => {
  const { cab } = req.params;
  const { funct, state } = req.body;
  if (funct === undefined || state === undefined) {
    res.status(400);
    res.json({ success: false, message: 'missing funct or state in request body' });
    return;
  }

  try {
    const result = await DataStore.controller.sendCommand(
      new TrainFunctionCommand(cab, funct, state),
    );
    res.json({ success: true, result });
  } catch (error) {
    res.status(400);
    res.json({ success: false, message: error.message });
  }
});

export default router;
