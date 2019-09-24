module.exports.list = ({res, token, results=20, page=1, sortField = null, sortOrder = 'ascend'}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (id) => {

          let connection;
          let total_count = 0;

          let orderBy = sortField ? `ORDER BY a.${sortField} ${sortOrder === 'ascend' ? 'ASC' : ''} ${sortOrder === 'descend' ? 'DESC' : ''} ` : '';
          let limits = results > 0 ? `LIMIT ${results * (page-1)}, ${results}` : '';

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`SELECT count(*) as 'c' FROM account a WHERE a.users_id = '${id}'`)
            )
            .then(
              (rows) => {
                total_count = rows[0].c;
              }
            )
            .then(
                (conn) => connection.query(`
                   SELECT a.key, a.description
                   FROM account a
                   WHERE a.users_id = '${id}'
                   ${orderBy}
                   ${limits}
               `)
            )
            .then(
              (list) => {
                res.status(200).send({list, total_count})
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
