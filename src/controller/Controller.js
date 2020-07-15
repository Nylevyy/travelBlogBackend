const express = require('express');
const router = express.Router();

// router.use(express.json);
// router.use(express.urlencoded);

router.get('/', (req, res) => {
  console.log('got it');
  res.send('everything\'s ok');
});

module.exports = router;
