module.exports.login = ({res, login, password}) => {

    if (!login) {
      res.sendStatus(401)
      return;
    }

    if (!password) {
      res.sendStatus(401)
      return;
    }

    let token = '';

    require('../../db/db').connector()
      .then(
          (conn) => {
              connection = conn;
          }
      )
      .then(
          (conn) => connection.query(`SELECT count(*) as 'c' FROM users a WHERE login = '${login}' AND password = '${password}'`)
      )
      .then(
        (rows) => {
          if (rows[0].c == 1) {
            token = require('../../utils/makeGenerators').makeToken();
            return token;
          } else {
            throw (401);
          }
        }
      )
      .then(
        (token) => connection.query(`INSERT INTO token (token) VALUES ('${token}')`)
      )
      .then(
        ({insertId}) => connection.query(`UPDATE users SET token_id = '${insertId}' WHERE login = '${login}'`)
      )
      .then(
        () => {
          res.status(200).send(token);
        }
      )
      .then(
        () => {
          if (connection && connection.end) connection.end();
        }
      )
      .catch(
          (status = 500) => {
            res.sendStatus(status);
          }
      );

}
