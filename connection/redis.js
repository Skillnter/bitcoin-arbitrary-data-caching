const redis = require('redis');

const config = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

if(process.env.REDIS_PASSWORD){
	config['password'] = process.env.REDIS_PASSWORD
}

const client = redis.createClient(config);

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

client.on('error', err => {
    console.log('Redis Error: ' + err);
});


/** @function
 *  @name saveWithTTL
 *  @param {String} key
 *  @param {Any} value
 *  @param {Number} ttl
 *
 *  @description Save the data into redis with an expiration time. Default TTL is 60 seconds.
 */
async function saveWithTTL(key, value, ttl=60) {
	return await setAsync(key, ttl, JSON.stringify(value));
}

/** @function
 *  @name getData
 *  @param {String} key
 *  @returns {Object}
 *
 *  @description Get the data from redis using key.
 */
async function getData(key) {
	const data = await getAsync(key);
	if(data){
		return JSON.parse(data);
	}
}

module.exports = {
	saveWithTTL,
	getData
}