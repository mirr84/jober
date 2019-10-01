module.exports.get = (
  {
    res, token,
    ...params
  }
) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let {id} = params;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`
                        SELECT * FROM document a
                        WHERE a.users_id = '${users_id}' AND a.id = '${id}'
                      `)
            )
            .then(
              (list) => {
                if (list.length === 0) throw (401);

                res.status(200).send({documentData: list[0]})
              }
            )
            .then(
              () => {
                if (connection && connection.end) connection.end();
              }
            )
            .catch(
                (status = 500) => {
                  if (connection && connection.end) connection.end();
                  res.sendStatus(status);
                }
            );

        },
        (status) => {
          res.sendStatus(status);
        }
    )

}
