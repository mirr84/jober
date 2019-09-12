module.exports.logout = ({res, token}) => {

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
        (conn) => connection.query(`
            UPDATE users SET token_id = NULL
            WHERE token_id = (
                SELECT a.id
                FROM token a
                WHERE a.token = '${token}'
            )
        `)
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
