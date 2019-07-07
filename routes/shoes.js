const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(201).send({
    id: 1,
    name: req.body.name
  });
});

module.exports = router;
