module.exports.add = ({res, token, description }) => {

  if (!description) {
    res.sendStatus(500)
    return;
  }

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (id) => {

          let connection;

          require('../../db/db').connector()
            .then(
                (conn) => {
                    connection = conn;
                }
            )
            .then(
                () => connection.query(`
                  INSERT INTO account (\`key\`, description, users_id)
                               VALUES ('${require('../../utils/makeGenerators').makeNumber(10)}', '${description}', '${id}')`)
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
