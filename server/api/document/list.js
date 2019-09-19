module.exports.list = (
  {
    res, token,
    results = 100, page = 1, sortField = null, sortOrder = 'ascend',
    ...params
  }
) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (id) => {

          let connection;
          let total_count = 0;

          let {description, income, expenditure, deleted = 0} = params;

          let orderBy = sortField ? `ORDER BY a.${sortField} ${sortOrder === 'ascend' ? 'ASC' : ''} ${sortOrder === 'descend' ? 'DESC' : ''} ` : '';
          let whereDelete = deleted ? '' : `AND a.deleted = '0'`;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`
                        SELECT count(*) as 'c' FROM document a
                        WHERE a.users_id = '${id}'
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
                   SELECT a.id,
                          c.key as 'key',
                          a.description,
                          b.description as 'category',
                          a.direct,
                          a.datetime,
                          a.summ,
                          a.deleted
                   FROM document a
                   LEFT JOIN category b ON a.category_id = b.id AND b.users_id = '${id}'
                   LEFT JOIN account c ON a.account_id = c.id AND c.users_id = '${id}'
                   WHERE a.users_id = '${id}'
                         ${whereDelete}
                   ${orderBy}
                   LIMIT ${results * (page-1)}, ${results}
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
