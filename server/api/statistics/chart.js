const moment = require('moment');

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

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (users_id) => {

          let minusPieData = [
            {
              x: 'расход 1',
              y: 111,
            },
            {
              x: 'расход 2',
              y: 222,
            },
            {
              x: 'расход 3',
              y: 333,
            },
            {
              x: 'расход 4',
              y: 444,
            }
          ];
          let plusPieData = [
            {
              x: 'доход 1',
              y: 111,
            },
            {
              x: 'доход 2',
              y: 222,
            },
            {
              x: 'доход 3',
              y: 333,
            },
            {
              x: 'доход 4',
              y: 444,
            }
          ];

          res.status(200).send({plusPieData, minusPieData})

        },
        (status) => {
          res.sendStatus(status);
        }
    )

}
