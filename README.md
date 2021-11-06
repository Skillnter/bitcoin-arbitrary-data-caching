# BITCOIN Arbitrary Data Caching

The purpose of this project is to store and index Bitcoin arbitrary data for all transactions that occur after a given block. This data will subsequently be served on an HTTP endpoint as a JSON payload.

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

| Variable       | Details                        | Required
| -------------- | -------------------------------| ---------
| USER           | Bitcoind RPC username          |   YES       
| PASS           | Bitcoind RPC password          |   YES
| PORT           | Express port                   |   NO
| dbuser         | PostgreSQL database username   |   YES                         
| database       | PostgreSQL database name       |   YES              
| dbpassword     | PostgreSQL database password   |   YES                   
| dbhost         | PostgreSQL database host       |   YES
| dbport         | PostgreSQL database port       |   YES             
| REDIS_HOST     | Redis Host                     |   YES
| REDIS_PORT     | Redis Port                     |   YES
| REDIS_PASSWORD | Redis Password                 |   NO
| REDIS_TTL      | Redis TTL for cache            |   NO


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

- `BITCOIN Arbitrary Data Caching` project is open-sourced software licensed under the [MIT license](LICENSE) by [Himanshu Bansal].

[node.js]: https://nodejs.org/
[BitcoinCore]: https://bitcoin.org/en/bitcoin-core/
[npm]: https://www.npmjs.com/get-npm
[PostgreSQL]: https://www.postgresql.org/
[Redis]: https://redis.io/
[Himanshu Bansal]: https://github.com/Skillnter/