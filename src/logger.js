import logConfig from 'logger-config.js';
const log4js = require('log4js');

/**
 * Export the default configuration for the logger.
 * Depends on the environmet.
 */
log4js.configure(logConfig);
let logCategory = null;
if (process.env.NODE_ENV=='production') {
    logCategory = 'pro';
} else if (process.env.NODE_ENV=='test') {
    logCategory = 'test';
} else {
    logCategory = 'default';
}
const logger = log4js.getLogger(logCategory);
export default logger;
