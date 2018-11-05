export default {
    appenders: {
        stdout: { type: 'stdout' },
        tofile: {
            type: 'file',
            filename: '../logs/nodejsseedproject.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true
        }
    },
    categories: {
        default: {
            appenders: ['tofile', 'stdout'],
            level: 'info'
        },
        sta: {
            appenders: ['tofile'],
            level: 'info'
        },
        pro: {
            appenders: ['tofile'],
            level: 'error'
        },
        test: {
            appenders: ['stdout'],
            level: 'off'
        }
    }
};
