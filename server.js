const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const client = require('./connection/bitcoin-core').client;
const app = express();

const query = require('./db/queries');

const root = require('./routes/root');

const PORT = process.env.PORT || 8080;

let height = 0;

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
 *  @name checkBlockChainInfo
 *  @returns {Void}
 *
 *  @description Checks the blockchain information and update the height value. Self start in 10 minutes incase of error or no new update. Start dataProcessing in case of updates.
 */
async function checkBlockChainInfo(){
	try{
		let blockChainInformation = await client.getBlockchainInformation();
		if(height < blockChainInformation.pruneheight){
			height = blockChainInformation.pruneheight;
		}
		if(height >= blockChainInformation.blocks){
			setTimeout(checkBlockChainInfo, 600000);
		}else{
			dataProcessing();
		}
	}catch(error){
		console.log("error",error);
		setTimeout(checkBlockChainInfo, 600000);
	}
}

/** @function
 *  @name dataProcessing
 *  @param {String} hash
 *  @returns {Void}
 *
 *  @description Get block transactions list from hash. Use findOpReturn function to find the OP_RETURN HEX and addEntry function to make an entry to the database.
 */
async function dataProcessing(hash){
	try{
		let detail_hash = null;
		if(hash){
			detail_hash = hash;
		}else{
			let block_stats = await client.command([{method:'getblockstats', parameters:[height]}]);
			detail_hash = block_stats[0].blockhash;
		}
		let block_details = await client.getBlockByHash(detail_hash);
		for(let i = 0; i < block_details.tx.length; i++){
			let OP_RETURN = findOpReturn(block_details.tx[i].vout);
			if(OP_RETURN){
				query.addEntry(OP_RETURN,block_details.tx[i].hash, block_details.hash);
			}
		}
		height = block_details.height;
		if(block_details.nextblockhash){
			dataProcessing(block_details.nextblockhash);
		}else{
			checkBlockChainInfo();
		}
	}catch(error){console.log(error)
		checkBlockChainInfo();
	}
}

const start = async () => {
	try{
		let table = await query.createTableIfNotExist();
		let index = await query.createIndexForOPReturn();

		app.use('/',root);

		checkBlockChainInfo();

		app.listen(PORT,()=>{
			console.log(`server started on port ${PORT}`);
		})
	}catch(error){
		console.log(error);
		process.exit();
	}
}

start();