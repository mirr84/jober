module.exports.update = ({res, token, id, description, income, expenditure}) => {

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
                  UPDATE category SET description = '${description}', income = '${income ? 1 : 0}', expenditure='${expenditure ? 1 : 0}'
                  WHERE users_id = '${users_id}' AND id = '${id}'
                               `)
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
