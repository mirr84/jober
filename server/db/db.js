const mysql = require('promise-mysql');

const connector = () =>
    mysql
        .createConnection(require('./../config/config').dbConfig)
        .catch(
            ({error, res, connection}) => {
                if (connection && connection.end) connection.end();

                throw 500;
            }
        );

module.exports = ({connector});
