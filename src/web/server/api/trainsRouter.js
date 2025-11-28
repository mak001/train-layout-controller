import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Train API is working' });
});

export default router;
