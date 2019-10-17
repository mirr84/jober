module.exports.list = (
  {
      res, token,
      results=20, page=1, sortField = null, sortOrder = 'ascend',
      ...params
  }) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;
          let total_count = 0;

          let {deleted = 0} = params;

          let orderBy = sortField ? `ORDER BY a.${sortField} ${sortOrder === 'ascend' ? 'ASC' : ''} ${sortOrder === 'descend' ? 'DESC' : ''} ` : '';
          let limits = results > 0 ? `LIMIT ${results * (page-1)}, ${results}` : '';
          let whereDelete = deleted ? '' : `AND a.deleted = '0'`;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`
                              SELECT count(*) as 'c'
                              FROM account a
                                  WHERE a.users_id = '${users_id}'
                                      ${whereDelete}
                            `)
            )
            .then(
              (rows) => {
                total_count = rows[0].c;
              }
            )
            .then(
                (conn) => connection.query(`
                  SELECT c.key,
                         c.description,
                         group_concat(c.operations separator '/+') as 'operations',
                         c.balans FROM (
                          SELECT a.key, a.description,
                                 count(d.account_id) * d.direct as 'operations',
                                 'balans' as 'balans'
                          FROM account a
                          LEFT JOIN document d ON d.account_id = a.id AND d.users_id = '${users_id}' AND d.groupKeys IS NULL ${whereDelete}
                          WHERE a.users_id = '${users_id}' ${whereDelete}
                          GROUP BY d.account_id, d.direct
                        ) c
                  ${orderBy}
                  GROUP BY c.key
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
