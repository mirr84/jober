module.exports.logout = ({res, token}) => {

  if (!token) {
    res.sendStatus(401)
    return;
  }

  

  res.sendStatus(200)

}
