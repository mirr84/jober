const init = (app) => {

    const config = [

        {url: '/auth/check', method: 'get'},

    ]

    require('./executer')({config, app});

}

module.exports = ({init});
