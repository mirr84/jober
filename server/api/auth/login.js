module.exports.login = ({res, login, password}) => {

    if ( login == '11' && password == '22' ) {
      res.status(200).send('test_token')
    } else {
      res.sendStatus(401)
    }

}
