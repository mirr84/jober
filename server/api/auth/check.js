module.exports.check = ({res, token}) => {

  if (!token) {
    res.sendStatus(401)
    return;
  }

  require('../../db/db').connector()
    .then(
        (conn) => {
            connection = conn;
        }
    )
    .then(
        (conn) => connection.query(`SELECT count(*) as 'c' FROM token a WHERE a.token = '${token}'`)
    )
    .then(
      (rows) => {
        if (rows[0].c == 1) {
          res.sendStatus(200);
        } else {
          throw (401);
        }
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
