# BITCOIN OP_RETURN CACHING 

The purpose of this project is to store and index Bitcoin OP_RETURN data for all transactions after a certain block. This data will then be served on an HTTP endpoint as a JSON payload.

## Development Setup

### Prerequisites


- Install [Node.js] which includes [Node Package Manager][npm]
- Install [BitcoinCore] which includes bitcoind
- Install [PostgreSQL]


### Install Modules

```console
npm install 
```

### Environmental Variables

For reference, `.env.sample` is added to the project. Rename `.env.sample` to `.env`.

```shell
# .env
USER=
PASS=
PORT=
dbuser=
database=
dbpassword=
dbhost=
dbport=
````

| Variable    | Details                       
| ----------- | -------------------------------
| USER        | Bitcoind RPC username                       
| PASS        | Bitcoind RPC password            
| PORT        | Express port                    
| dbuser      | PostgreSQL database username                             
| database    | PostgreSQL database name                      
| dbpassword  | PostgreSQL database password                       
| dbhost      | PostgreSQL database host
| dbport      | PostgreSQL database port                     


## Running Application 

```javascript
node server.js 
````


[node.js]: https://nodejs.org/
[BitcoinCore]: https://bitcoin.org/en/bitcoin-core/
[npm]: https://www.npmjs.com/get-npm
[PostgreSQL]: https://www.postgresql.org/