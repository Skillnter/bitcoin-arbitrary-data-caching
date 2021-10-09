const express = require('express');
const STATUS_CODES = require('http-response-status-code');

var router = express.Router();

const query = require('../db/queries');

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
		let data = await query.getOpReturnDetails(req.params['op_return'])
		let response = "No data found.";
		if(data.rows.length > 0){
			response = data.rows;
		}
		res.send({status:STATUS_CODES.OK,data:response});
	}catch(error){
		res.send({status:STATUS_CODES.INTERNAL_SERVER_ERROR,data:STATUS_CODES.getStatusDescription(STATUS_CODES.INTERNAL_SERVER_ERROR)});
	}
})

module.exports = router;