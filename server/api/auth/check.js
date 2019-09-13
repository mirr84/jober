module.exports.check = ({res, token}) => {

  require('../../utils/users_id')
    .users_id({token})
    .then(
        (id) => {
          res.sendStatus(200);
        },
        (status) => {
          res.sendStatus(status);
        }
    )

}
