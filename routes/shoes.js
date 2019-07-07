const express = require('express');
const router = express.Router();

const shoeRepository = require('../data/shoes');

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/', async (req, res) => {
  const shoe = await shoeRepository.create(req.body.name);
  res.status(201).send(shoe);
});

module.exports = router;
