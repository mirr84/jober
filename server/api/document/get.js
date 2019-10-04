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
                        (SELECT * FROM document a WHERE a.users_id = '${users_id}' AND a.id = '${id}' AND a.groupKeys IS NULL)
                        UNION
                        (SELECT * FROM document b WHERE b.groupKeys = (SELECT a.groupKeys FROM document a WHERE a.users_id = '${users_id}' AND a.id = '${id}' AND a.groupKeys IS NOT NULL))      
                      `)
            )
            .then(
              (list) => {
                if (list.length === 0) throw (401);
                if (list.length === 1) {
                  res.status(200).send({documentData: list[0]});
                  return;
                }
                if (list.length === 2) {
                  res.status(200).send({documentsData: list});
                  return;
                }
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
