const express = require('express');
const router = express.Router();

const shoeRepository = require('../repositories/shoes');

router.get('/', async (req, res) => {
  const shoes = await shoeRepository.findAll();
  res.send(shoes);
});

router.post('/', async (req, res) => {
  if (!('name' in req.body) || typeof req.body.name != 'string') {
    res.status(400).send({message: 'Name string required'});
  } else {
    let existingShoe = await shoeRepository.findByName(req.body.name);
    if (existingShoe) {
      res.status(400).send({message: 'Shoe with this name already exists'});
    } else {
      const newShoe = await shoeRepository.create(req.body.name);
      console.log('Created shoe "%s" with id %d', req.body.name, newShoe.id);
      res.status(201).send(newShoe);
    }
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  const id = parseInt(req.params.id);
  const shoe = await shoeRepository.findById(id);
  if (!shoe) {
    res.status(404).send({message: "No shoe with this id"});
  } else {
    res.send(shoe);
  }
});

router.post('/:id(\\d+)/add_true_to_size', async (req, res) => {
  const id = parseInt(req.params.id);

  const shoe = await shoeRepository.findById(id);
  if (!shoe) {
    res.status(404).send({message: "No shoe with this id"});
  } else {
    const reading = req.body.reading;
    if (reading < 1 || reading > 5) {
      res.status(400).send({"message": "True-to-size readings must be between 1 and 5"});
    } else {
      await shoeRepository.addTrueToSizeReading(id, reading);
      console.log('Added true-to-size reading of %d for shoe %d', reading, id);
      res.status(204).end();
    }
  }
});

module.exports = router;
