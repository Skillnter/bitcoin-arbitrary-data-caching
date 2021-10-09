const express = require('express');
const STATUS_CODES = require('http-response-status-code');

var router = express.Router();

const query = require('../db/queries');

module.exports = router;