require(['jquery'], function($){

    if (window.location.pathname === '/index.html') {
        require.ensure([], function() {
            require('./components/index');
        });
    } else if (window.location.pathname === '/index-2.html') {
        require.ensure([], function() {
            require('./components/index-2');
        });
    }

});
