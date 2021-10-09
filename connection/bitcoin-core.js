const Client = require('bitcoin-core');
const client = new Client({
	host:'localhost',
	username:process.env.USER,
	password:process.env.PASS
});

module.exports = {
	client:client
}