const moment = require('moment');

module.exports.add = ({res, token, ...params}) => {

  let {
    direct,
    keyFrom, categotyFrom,
    keyTo, categotyTo,
    categotyAny,
    dateDocument,
    summ,
    description
  }  = params;

  if (!summ) { res.sendStatus(500); return; };
  if (!dateDocument) { res.sendStatus(500); return; };
  if (!moment(dateDocument, 'DD.MM.YYYY HH:mm:ss').isValid()) { res.sendStatus(500); return; };

  switch(direct) {
    case 1:
      // keyTo, categotyTo, dateDocument, summ
      keyFrom = null;
      categotyFrom = null;
      if (!keyTo) { res.sendStatus(500); return; };
      if (!categotyTo) { res.sendStatus(500); return; };
      categotyAny = null;

      break;
    case -1:
      // keyFrom, categotyFrom, dateDocument, summ
      if (!keyFrom) { res.sendStatus(500); return; };
      if (!categotyFrom) { res.sendStatus(500); return; };
      keyTo = null;
      categotyTo = null;
      categotyAny = null;

      break;
    case 0:
      // keyTo, keyFrom, categotyAny, dateDocument, summ
      if (!keyFrom) { res.sendStatus(500); return; };
      categotyFrom = null;
      if (!keyTo) { res.sendStatus(500); return; };
      categotyTo = null;
      if (!categotyAny) { res.sendStatus(500); return; };

      break;
    default: res.sendStatus(500); return;
  }

  dateDocument = moment(dateDocument, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  description = description || '';

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let connection;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => {
                    if (direct === 0) {
                      return connection.query(`select b.groupKeys from (select max(a.groupKeys) as groupKeys from document a) b WHERE b.groupKeys IS NOT NULL`)
                    } else {
                      return null;
                    }
                }
            )
            .then(
                (groupKeys) => {

                  let newGroupKeys = 'NULL';
                  if (Array.isArray(groupKeys)) {
                    if (groupKeys.length === 1) {
                      newGroupKeys = groupKeys[0].groupKeys + 1;
                    } else {
                      newGroupKeys = 1;
                    }
                    // групповая
                    let d1 = connection.query(`
                    INSERT INTO document (users_id, groupKeys, account_id, category_id, direct, summ, description, datetime)
                      VALUES (
                        ${users_id},
                        ${newGroupKeys},
                        (SELECT a.id FROM account a WHERE a.key = '${keyFrom}'),
                        ${categotyAny},
                        '-1',
                        '${summ}',
                        '${description}',
                        '${dateDocument}'
                      );
                    `)
                    let d2 = connection.query(`
                      INSERT INTO document (users_id, groupKeys, account_id, category_id, direct, summ, description, datetime)
                      VALUES (
                         ${users_id},
                         ${newGroupKeys},
                         (SELECT a.id FROM account a WHERE a.key = '${keyTo}'),
                         ${categotyAny},
                         '1',
                         '${summ}',
                         '${description}',
                         '${dateDocument}'
                      );
                    `)
                    return Promise.all([d1, d2]);
                  } else {
                    // одиночная
                    let d1 = connection.query(`
                    INSERT INTO document (users_id, groupKeys, account_id, category_id, direct, summ, description, datetime)
                      VALUES (
                        ${users_id},
                        ${newGroupKeys},
                        (SELECT a.id FROM account a WHERE a.key = '${keyFrom || keyTo}'),
                        ${categotyFrom || categotyTo},
                        ${direct},
                        ${summ},
                        '${description}',
                        '${dateDocument}'
                      );
                    `)
                    return Promise.all([d1]);
                  }

              }
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
