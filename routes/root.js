const express = require('express');
const STATUS_CODES = require('http-response-status-code');

var router = express.Router();

const query = require('../db/queries');

const redis = require('../connection/redis');

const TTL = process.env.REDIS_TTL || 600

/**
 * @api {get} /:op_return Request OP_RETURN Hex
 * @apiName GetTransactionAndBlockHash
 * @apiGroup User
 *
 * @apiParam {String} op_return Hex of OP_RETURN.
 *
 * @apiSuccess {String} status Status Code.
 * @apiSuccess {String|Object[]} data  Array of transaction and block hashes or Error Message.
 */
router.get('/:op_return', async function (req, res) {
	try{

		const cacheKey = `op_return_${req.params['op_return']}`;
		const cachedData = await redis.getData(cacheKey);

		if (cachedData) {
			return res.send({status:STATUS_CODES.OK,data:cachedData});
		}

		let data = await query.getOpReturnDetails(req.params['op_return'])
		let response = "No data found.";
		if(data.rows.length > 0){
			response = data.rows;
			await redis.saveWithTTL(cacheKey, response, TTL);
		}
		res.send({status:STATUS_CODES.OK,data:response});
	}catch(error){
		res.send({status:STATUS_CODES.INTERNAL_SERVER_ERROR,data:STATUS_CODES.getStatusDescription(STATUS_CODES.INTERNAL_SERVER_ERROR)});
	}
})

module.exports = router;