const init = (app) => {

    const config = [

        {url: '/auth/check', method: 'get'},
        {url: '/auth/login', method: 'get'},
        {url: '/auth/logout', method: 'get'},

        {url: '/account/list', method: 'get'},

        {url: '/category/list', method: 'get'},

        {url: '/document/list', method: 'get'},

    ]

    require('./executer')({config, app});

}

module.exports = ({init});
