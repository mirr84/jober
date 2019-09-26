module.exports.delete = ({res, token, ...params}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;
          let {id} = params;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => connection.query(`
                        UPDATE document SET deleted = '1'
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
                  if (connection && connection.end) connection.end();
                }
            );

        },
        (status) => {
          res.sendStatus(status);
        }
    )

}
