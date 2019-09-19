module.exports.add = ({res, token, ...params}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;

          let {direct = 0} = params;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => connection.query(`
                  INSERT INTO document (users_id, account_id, category_id, direct, summ, description, datetime)
                    VALUES (
                      '${users_id}',
                      '67',
                      '1',
                      '${direct}',
                      '123',
                      'sdfsd fdsf sf',
                      '2019-09-19 00:00:00'
                    );
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
