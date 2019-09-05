module.exports.check = ({res, token}) => {

  if (token == 'test_token') {
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }

}
