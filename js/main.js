'use strict';

(function($, window, undefined){

    if (window.location.pathname === '/index.html') {
        require.ensure([], function() {
            require('./components/index');
        });
    } else if (window.location.pathname === '/index-2.html') {
        require.ensure([], function() {
            require('./components/index-2');
        });
    }

})(jQuery, window);
