const express = require('express');
const router = express.Router();

const shoeRepository = require('../data/shoes');

router.get('/', async (req, res) => {
  const shoes = await shoeRepository.findAll();
  res.send(shoes);
});

router.get('/:id(\\d+)', async (req, res) => {
  const id = parseInt(req.params.id);
  const shoe = await shoeRepository.findById(id);
  res.send(shoe);
});

router.post('/', async (req, res) => {
  const shoe = await shoeRepository.create(req.body.name);
  res.status(201).send(shoe);
});

module.exports = router;
