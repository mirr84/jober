module.exports = ({config, app}) => {

    config.map(
        item => app[item.method]('/api'+item.url, (req, res) =>
          require(`.${item.url}`)[item.url.split('/').pop()](
                {
                    ...req.query,
                    ...req.body,
                    ...req,
                    token: req.headers.token,
                    res
                }
            )
        )
    )

}
