# BITCOIN OP_RETURN CACHING 

The purpose of this project is to store and index Bitcoin OP_RETURN data for all transactions after a certain block. This data will then be served on an HTTP endpoint as a JSON payload.

## Development Setup

### Prerequisites


- Install [Node.js] which includes [Node Package Manager][npm]
- Install [BitcoinCore] which includes bitcoind
- Install [PostgreSQL]
- Install [Redis]


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
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_TTL=
````

| Variable       | Details                       
| -------------- | -------------------------------
| USER           | Bitcoind RPC username                       
| PASS           | Bitcoind RPC password            
| PORT           | Express port                    
| dbuser         | PostgreSQL database username                             
| database       | PostgreSQL database name                      
| dbpassword     | PostgreSQL database password                       
| dbhost         | PostgreSQL database host
| dbport         | PostgreSQL database port                     
| REDIS_HOST     | Redis Host     
| REDIS_PORT     | Redis Port    
| REDIS_PASSWORD | Redis Password
| REDIS_TTL      | Redis TTL for cache    


## Running Application 

```javascript
node server.js 
````

or 

```javascript
npm start
````

## Application Structure

- `server.js`&nbsp; &nbsp; &nbsp;- The entry point to our application. This file defines our express server.
- `connection/`   - This folder contains configuration for database and bitcoin core RPC.
- `routes/`&nbsp; &nbsp; &nbsp; &nbsp; - This folder contains the route definitions for our API.
- `db/`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- This folder contains the PostgreSQL queries.

## People

- The original author of the project is [Himanshu Bansal](https://github.com/Skillnter)

## License

- `BITCOIN OP_RETURN CACHING` project is open-sourced software licensed under the [MIT license](LICENSE) by [Himanshu Bansal].

[node.js]: https://nodejs.org/
[BitcoinCore]: https://bitcoin.org/en/bitcoin-core/
[npm]: https://www.npmjs.com/get-npm
[PostgreSQL]: https://www.postgresql.org/
[Redis]: https://redis.io/
[Himanshu Bansal]: https://github.com/Skillnter/