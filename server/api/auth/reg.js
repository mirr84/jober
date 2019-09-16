module.exports.reg = ({res, login, password, email}) => {

  if (!login) {
    res.sendStatus(500)
    return;
  }

  if (!password) {
    res.sendStatus(500)
    return;
  }

  if (!email) {
    res.sendStatus(500)
    return;
  }

  let connection;

  require('../../db/db').connector()
    .then(
        (conn) => {
            connection = conn;
        }
    )
    .then(
        (conn) => connection.query(`SELECT count(*) as 'c' FROM users a WHERE a.login = '${login}'`)
    )
    .then(
      (rows) => {
        if (rows[0].c > 0) throw (401);
      }
    )
    .then(
      () => connection.query(`SELECT count(*) as 'c' FROM users a WHERE a.email = '${email}'`)
    )
    .then(
      (rows) => {
        if (rows[0].c > 0) throw (401);
      }
    )
    .then(
      () => connection.query(`INSERT INTO users (login, password, email) VALUES ('${login}', '${password}', '${email}')`)
    )
    .then(
      () => {
        res.sendStatus(200);
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
