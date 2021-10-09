const pool = require('../connection/db').pool;

/** @function
 *  @name addEntry
 *  @returns {Promise}
 *
 *  @description Add Entry to the new_btc table.
 */
const addEntry = (op,tx,block) => {
	return pool.query('INSERT INTO btc (op_return,tx_hash,block_hash) VALUES ($1, $2, $3)', [op,tx,block]);
}

/** @function
 *  @name getOpReturnDetails
 *  @param {String} op_return OP_RETURN hex
 *  @returns {Promise}
 *
 *  @description Search for OP_RETURN hex value and return transactions hashes and block hashes.
 */
const getOpReturnDetails = (op_return) =>{
	return pool.query('select tx_hash as transaction_hash, block_hash from btc where op_return=\''+op_return+'\'');
}

/** @function
 *  @name createTableIfNotExist
 *  @returns {Promise}
 *
 *  @description Create table new_btc if table not exist.
 */
const createTableIfNotExist = () =>{
	return pool.query(`
		CREATE TABLE IF NOT EXISTS btc (
			id SERIAL,
			op_return varchar(450) NOT NULL,
			tx_hash varchar(450) NOT NULL,
			block_hash varchar(450) NOT NULL,
			PRIMARY KEY (id)
		)`
	);
}

/** @function
 *  @name createIndexForOPReturn
 *  @returns {Promise}
 *
 *  @description Create btc table index for column op_return.
 */
const createIndexForOPReturn = ()=>{
	return pool.query(`CREATE INDEX CONCURRENTLY IF NOT EXISTS indexes_btc ON btc using btree (op_return ASC NULLS LAST)`);
}

module.exports = {
	addEntry:addEntry,
	getOpReturnDetails:getOpReturnDetails,
	createTableIfNotExist:createTableIfNotExist,
	createIndexForOPReturn:createIndexForOPReturn
}