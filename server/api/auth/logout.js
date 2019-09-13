module.exports.logout = ({res, token}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (id) => {

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`UPDATE users SET token_id = NULL WHERE id = '${id}'`)
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

        },
        (status) => {
          res.sendStatus(status);
        }
    )

}
