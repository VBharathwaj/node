const pino = require('pino');
const uuid = require('uuid');
const R = require('ramda');

const getrequestId = (req) => (!R.isEmpty(req.headers['x-correlation-id']) && !R.isNil(req.headers['x-correlation-id']) ? req.headers['x-correlation-id'] : uuid());
const isProductionEnvironment = () => process.env.NODE_ENV === 'prod';
const logLevel = isProductionEnvironment() ? 'info' : 'debug';

let id = '';
const logger = pino({
  level: logLevel,
  prettyPrint: true,
  useLevelLabels: true,
  serializers: {
    res(res) {
      return {
        correlationId: id,
        statusCode: res.statusCode,
        timestamp: new Date(),
      };
    },
    req(req) {
      id = getrequestId(req);
      return {
        correlationId: id,
        method: req.method,
        url: req.url,
        path: req.path,
        parameters: req.body,
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.connection.remotePort,
        timestamp: new Date(),
      };
    },
  },
});


module.exports = logger;
