module.exports.list = ({res, token}) => {

  // results=20&page=1&sortField=name&sortOrder=ascend&gender=female

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
                (conn) => connection.query(`
                   SELECT a.key, a.description
                   FROM account a
                   WHERE a.users_id = '${id}'
               `)
            )
            .then(
              (list) => {
                res.status(200).send({list, total_count: list.length})
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
