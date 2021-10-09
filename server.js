const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const client = require('./connection/bitcoin-core').client;
const app = express();

const query = require('./db/queries');

const root = require('./routes/root');

const PORT = process.env.PORT;

app.listen(PORT,()=>{
	console.log(`server started on port ${PORT}`);
})