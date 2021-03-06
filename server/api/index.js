const init = (app) => {

    const config = [

        {url: '/auth/check', method: 'get'},
        {url: '/auth/login', method: 'get'},
        {url: '/auth/reg', method: 'get'},
        {url: '/auth/logout', method: 'get'},

        {url: '/account/list', method: 'get'},
        {url: '/account/add', method: 'post'},

        {url: '/category/list', method: 'get'},
        {url: '/category/update', method: 'post'},
        {url: '/category/add', method: 'get'},

        {url: '/document/list', method: 'get'},
        {url: '/document/add', method: 'post'},
        {url: '/document/delete', method: 'get'},
        {url: '/document/get', method: 'get'},

        {url: '/statistics/days', method: 'get'},
        {url: '/statistics/chart', method: 'get'},
                
    ]

    require('./executer')({config, app});

}

module.exports = ({init});
