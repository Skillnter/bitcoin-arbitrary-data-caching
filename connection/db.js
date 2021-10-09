const Pool = require('pg').Pool
const pool = new Pool({
	user: process.env.dbuser,
	host: process.env.dbhost,
	database: process.env.database,
	password: process.env.dbpassword,
	port: process.env.dbport,
})

module.exports = {
	pool:pool
}