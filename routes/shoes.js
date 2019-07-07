const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/', (req, res) => {
  res.status(201).send({
    id: 1,
    name: 'Jordan 1 Retro'
  });
});

module.exports = router;
