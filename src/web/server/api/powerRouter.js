import express from 'express';
import DataStore from '../../../DataStore';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(DataStore.store.power);
});

router.post('/', (req, res) => {
  
});

export default router;
