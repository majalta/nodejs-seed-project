'use strict';
import settings from 'server-settings';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const app = express();
const log4js = require('log4js');
const logger = log4js.getLogger();
const port = settings.http.port || 9000; // set our port

// default level is OFF - which means no logs at all.
// logger.level = process.env.NODE_ENV=='production'?'error':'debug';
logger.level = 'info';
//  ERROR HANDLING
function logErrors(err, req, res, next) {
    logger.error(`[ServerIndex] ${err.message}`);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        });
    } else {
        next(err);
    }
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    res.status(500).send({
        'error': {
            error: err.message
        }
    });
}

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running in [${process.env.NODE_ENV}] mode`);
    logger.level = process.env.NODE_ENV=='production'?'error':'debug';
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        logger.error(`worker ${worker.process.pid} died`);
    });
} else {
    //  ROUTER MANAGER   -----------------------------
    const articleRoutes = require('./routes/article');
    app.use('/coverage', express.static('./test/coverage'));
    app.use('/report', express.static('./test/report'));
    app.use('/article', articleRoutes);
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
    // START THE SERVER
    // =============================================================================
    app.listen(port);
    process.on('SIGINT', function() {
        logger.info('\nGracefully shutting down from SIGINT (Ctrl-C)');
        // some other closing procedures go here
        process.exit(1);
    });
    logger.info(`[${process.pid}] ======================= Server is running in port: ${port}`);
    logger.level = process.env.NODE_ENV=='production'?'error':'debug';

}
