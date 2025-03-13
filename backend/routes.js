const express = require('express');
const { getUsers } = require('./controllers');

const router = express.Router();

router.get('/usuarios', getUsers);

module.exports = router;
