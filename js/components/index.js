var pero = 1;

require(['jquery'], function($){
    console.log($);
});

console.log(pero);

require(['scrollmagic'], function(ScrollMagic){
    console.log(ScrollMagic);
});

function shared(){
    console.log('shared 11111');
}

shared();
