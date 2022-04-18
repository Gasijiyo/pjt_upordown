// Route 분산

const express = require('express');
const router = express.Router();
// const cors = require('cors');
// const proxy = require('http-proxy-middleware');

const home = require('./home');
const stock = require('./stock');
// const corsOptions = {
//     origin: "http://localhost:8011"
// }

// router.use(cors(corsOptions))

router.use('/', home);
router.use('/stock', stock)

module.exports = router;