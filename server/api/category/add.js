module.exports.add = ({res, token}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => connection.query(`
                  INSERT INTO category (description, users_id)
                              VALUES ('Новая категория', '${users_id}')`)
            )
            .then(
                () => res.sendStatus(200)
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
