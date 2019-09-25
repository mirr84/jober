const moment = require('moment');

module.exports.days = (
  {
    res, token,
    ...params
  }
) => {

  let {type, y, m} = params;

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;

          let start = moment(`1.${m}.${y} 00:00:00`, 'DD.MM.YYYY HH:mm:ss').add(-1,'M').format('YYYY-MM-DD HH:mm:ss');
          let stop = moment(`1.${m}.${y} 00:00:00`, 'DD.MM.YYYY HH:mm:ss').add(2,'M').format('YYYY-MM-DD HH:mm:ss');

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                (conn) => connection.query(`
                    SELECT DATE_FORMAT(a.datetime, '%d.%m.%Y') as 'date',
                           SUM(a.summ) as 'summ',
                           a.direct
                    FROM document a
                    WHERE a.users_id = '${users_id}' AND
                          a.datetime BETWEEN '${start}' AND '${stop}' AND
                          a.groupKeys IS NULL
                    GROUP BY DAY(a.datetime), a.direct
                `)
            )
            .then(
              (list) => {
                res.status(200).send(list)
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
