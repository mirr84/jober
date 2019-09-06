module.exports.list = ({res, token}) => {

  res.status(200)
     .send(
       {
         list: [{field_name: 'string'}],
	       total_count: 100500
       }
     )

}
