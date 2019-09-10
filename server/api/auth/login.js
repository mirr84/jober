module.exports.login = ({res, login, password}) => {

    if (!login) {
      res.sendStatus(401)
      return;
    }

    if (!password) {
      res.sendStatus(401)
      return;
    }

    // require('../../db/db').connector()
    //   .then(
    //       (conn) => {
    //           connection = conn;
    //           return connection.query(`SELECT * FROM users a WHERE login = '${login}' AND password = '${password}'`);
    //           res.status(200).send('test_token')
    //       }
    //   )
    //   .catch(
    //       () => {
    //         res.sendStatus(500)
    //       }
    //   );

    if ( login == '11' && password == 'b6d767d2f8ed5d21a44b0e5886680cb9' ) {
      res.status(200).send('test_token')
    } else {
      res.sendStatus(401)
    }

}
