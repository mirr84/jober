const moment = require('moment');

// SELECT b.description, a.direct, SUM(a.summ) as 'summ'
// FROM document a
// LEFT JOIN category b ON a.category_id = b.id
// WHERE a.datetime BETWEEN '2019-01-01' AND '2019-12-31' AND
//       a.groupKeys IS NULL
// GROUP BY a.category_id, a.direct

module.exports.chart = (
  {
    res, token,
    ...params
  }
) => {

  let {dateStrings} = params;

  if (!dateStrings) { res.sendStatus(500); return; };
  if (!Array.isArray(dateStrings)) { res.sendStatus(500); return; };
  if (dateStrings.length !== 2) { res.sendStatus(500); return; };
  if (!moment(dateStrings[0], 'DD.MM.YYYY HH:mm:ss').isValid()) { res.sendStatus(500); return; };
  if (!moment(dateStrings[1], 'DD.MM.YYYY HH:mm:ss').isValid()) { res.sendStatus(500); return; };

  let d1 = moment(dateStrings[0], 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD');
  let d2 = moment(dateStrings[1], 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD');

  let minusPieData = [];
  let plusPieData = [];

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;
          let whereDelete = `AND a.deleted = '0'`;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => connection.query(`
                      SELECT b.description, a.direct, SUM(a.summ) as 'summ'
                      FROM document a
                      LEFT JOIN category b ON a.category_id = b.id AND b.users_id = '${users_id}'
                      WHERE a.users_id = '${users_id}' AND
                            a.datetime BETWEEN '${d1}' AND '${d2}' AND
                            a.groupKeys IS NULL
                            ${whereDelete}
                      GROUP BY a.category_id, a.direct
                  `)
            )
            .then(
              (list) => {

                plusPieData = list
                  .filter( a => a.direct === 1 )
                  .map( a => ({x: a.description, y: a.summ}) )

                minusPieData = list
                  .filter( a => a.direct === -1 )
                  .map( a => ({x: a.description, y: a.summ}) )

                res.status(200).send({plusPieData, minusPieData})
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
