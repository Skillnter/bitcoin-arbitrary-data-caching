const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const client = require('./connection/bitcoin-core').client;
const app = express();

const query = require('./db/queries');

const root = require('./routes/root');

const PORT = process.env.PORT;

let pruneheight = 0;
let blocks = 0;

/** @function
 *  @name findOpReturn
 *  @param {Object[]} vout
 *  @returns {String|Boolean} returns OP_RETURN Hex or false
 *
 *  @description Search the vout array for OP_RETURN and return hex value or false.
 */
function findOpReturn(vout){
	if(vout.length > 0){
		for(let i = 0; i < vout.length; i++){
			if(vout[i].scriptPubKey && vout[i].scriptPubKey.asm.includes('OP_RETURN')){
				return vout[i].scriptPubKey.asm.split(" ")[1];
			}
		}
	}
	return false;
}

/** @function
 *  @name restart_init
 *  @returns {Void}
 *
 *  @description Increment the pruneheight and restart the init function.
 */
function restart_init(){
	pruneheight++;
	init();
}


/** @function
 *  @name init
 *  @returns {Void}
 *
 *  @description Checks the pruneheight and blocks value and start either checkBlockChainInfo or dataProcessing function.
 */
function init(){
	if(pruneheight >= blocks || blocks == 0){
		checkBlockChainInfo();
	}else{
		dataProcessing();
	}
}

/** @function
 *  @name checkBlockChainInfo
 *  @returns {Void}
 *
 *  @description Checks the blockchain information and update the pruneheight & blocks value. Self start in 2 seconds incase of error or no new update. Start dataProcessing in case of updates.
 */
async function checkBlockChainInfo(){
	try{
		let blockChainInformation = await client.getBlockchainInformation();
		if(pruneheight < blockChainInformation.pruneheight){
			pruneheight = blockChainInformation.pruneheight;
		}
		if(blocks != blockChainInformation.blocks){
			blocks = blockChainInformation.blocks;
			dataProcessing();
		}else{
			checkBlockChainInfo();
		}
	}catch(error){
		console.log("error",error);
		setTimeout(checkBlockChainInfo, 2000);
	}
}

/** @function
 *  @name dataProcessing
 *  @returns {Void}
 *
 *  @description Get block transactions list from hash. Use findOpReturn function to find the OP_RETURN HEX and addEntry function to make an entry to the database.
 */
async function dataProcessing(){
	try{
		let block_stats = await client.command([{method:'getblockstats', parameters:[pruneheight]}]);
		let block_details = await client.getBlockByHash(block_stats[0].blockhash);
		for(let i = 0; i < block_details.tx.length; i++){
			let OP_RETURN = findOpReturn(block_details.tx[i].vout);
			if(OP_RETURN){
				query.addEntry(OP_RETURN,block_details.tx[i].hash, block_details.hash);
			}
		}
		restart_init();
	}catch(error){
		restart_init();
	}
}

const start = async () => {
	try{
		let table = await query.createTableIfNotExist();
		let index = await query.createIndexForOPReturn();

		app.use('/',root);

		init();

		app.listen(PORT,()=>{
			console.log(`server started on port ${PORT}`);
		})
	}catch(error){
		console.log(error);
		process.exit();
	}
}

start();