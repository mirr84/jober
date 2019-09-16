module.exports.users_id = ({token}) =>

  new Promise(
    (resolve, reject) => {

      if (!token) {

        reject(401);

      } else {

        let connection;

        require('../db/db').connector()
          .then(
              (conn) => {
                  connection = conn;
              }
          )
          .then(
              (conn) => connection.query(`
                    SELECT a.id
                    FROM users a
                    LEFT JOIN token b ON a.token_id = b.id
                    WHERE b.token = '${token}'
              `)
          )
          .then(
              (rows) => {
                if (!Array.isArray(rows)) reject(500);
                if (rows.length != 1) reject(401);
                resolve(rows[0].id);
              }
          )
          .then(
              (rows) => {
                if (connection && connection.end) connection.end();
              }
          )
          .catch(
              (status = 500) => {
                if (connection && connection.end) connection.end();
                reject(status);
              }
          );

      }

    }
  )
