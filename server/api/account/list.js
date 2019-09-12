module.exports.list = ({res, token}) => {

  // results=20&page=1&sortField=name&sortOrder=ascend&gender=female

  if (!token) {
    res.sendStatus(401)
    return;
  }

     require('../../db/db').connector()
       .then(
           (conn) => {
               connection = conn;
           }
       )
       .then(
           (conn) => connection.query(`
              SELECT a.id, a.key, a.description 
              FROM account a
          `)
       )
       .then(
         (list) => {
           res.status(200).send({list, total_count: list.length})
         }
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

}
