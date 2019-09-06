const init = (app) => {

    const config = [

        {url: '/auth/check', method: 'get'},
        {url: '/auth/login', method: 'get'},
        {url: '/auth/logout', method: 'get'},

        {url: '/build/list', method: 'get'},

        {url: '/science/list', method: 'get'},

    ]

    require('./executer')({config, app});

}

module.exports = ({init});
