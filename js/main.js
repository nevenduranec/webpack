'use strict';
(function($, window, undefined){

    $(document).foundation();

    // PRODUCT
    var controller = new ScrollMagic.Controller(),
        scene;

    var image = $('.ProductHeader-image img'),
        header = $('.ProductHeader'),
        doneDesktop = false,
        doneMobile = false,
        imageHeightOld = 0;

    if (image){

        image.one('load', function() {

            $(window).resize(function(){

                if (doneDesktop && scene) {
                    scene.duration($('.ProductContent').height() - $('.ProductHeader-image img').height() + $('.ProductHeader-imageHolder').height());
                }

                if (Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'mediumsmall' || Foundation.MediaQuery.current === 'medium') {

                    if (!doneMobile) {

                        if (scene) {
                            scene.destroy(scene);
                            scene = null;
                        }

                        if (doneDesktop) {
                            var clone = $('.ProductHeader-imageHolder').clone();
                            $('.ProductHeader-imageHolder').remove();
                            $('.ProductContent > .row:first-child').append(clone);
                            image = $('.ProductHeader-image img');
                        }

                        var imageHeight = image.height();


                        if (imageHeightOld !== imageHeight) {
                            header.css({
                                'margin-bottom': - imageHeight / 2,
                                'padding-bottom': imageHeight / 2
                            });
                        }

                        imageHeightOld = imageHeight;
                        doneMobile = true;
                        doneDesktop = false;

                    }

                } else {

                    if (!doneDesktop) {

                        imageHeightOld = 0;
                        header.css({
                            'margin-bottom': 'auto',
                            'padding-bottom': 'inherit'
                        });

                        var clone2 = $('.ProductHeader-imageHolder').clone();
                        $('.ProductHeader-imageHolder').remove();
                        $('.ProductHeader-content').append(clone2);

                        var duration = $('.ProductContent').height() - $('.ProductHeader-image img').height() + $('.ProductHeader-imageHolder').height();

                        scene = new ScrollMagic.Scene({
                            triggerElement: '.ProductHeader-image',
                            triggerHook: 0,
                            duration: duration
                        })
                        .setPin('.ProductHeader-image', {pushFollowers: false})
                        //.addIndicators()
                        .addTo(controller);

                        doneMobile = false;
                        doneDesktop = true;



                    }

                }

            }).trigger('resize');

        }).each(function() {
            if(this.complete) {
                $(this).load();
            }
        });

    }

    // END PRODUCT


    $('.Expandable').find('.Expandable-title').on('click', function(){
        $(this).toggleClass('is-expanded');
        $(this).next('.Expandable-content').slideToggle('fast', function(){
            if (scene) {
                scene.duration($('.ProductContent').height() - $('.ProductHeader-image img').height() + $('.ProductHeader-imageHolder').height());
            }
        });

    });

    $('.js-showNutritiveValue').on('click', function(){
        $(this).closest('table').find('.NutritiveValue-row--hidden').removeClass('NutritiveValue-row--hidden');
        $(this).remove();
        if (scene) {
            scene.duration($('.ProductContent').height() - $('.ProductHeader-image img').height() + $('.ProductHeader-imageHolder').height());
        }
    });



    $('.js-getRecipes').on('click', function(e) {

        e.preventDefault();

        var btn = $(this),
            container = $(this).data('ajax-container'),
            loader = $(container).siblings('.js-loader'),
            limit = $(this).data('ajax-limit'),
            offset = $(container).data('items'),
            partial = $(this).data('ajax-type'),
            ajaxUrl = $(this).data('url');

        $.ajax({
            dataType: 'json',
            url: ajaxUrl + '?partial=' + partial + '&limit=' + limit + '&offset=' + offset,
            beforeSend: function() {
                btn.addClass('u-isHidden');
                loader.removeClass('u-isHidden');
            },
            success: function(data) {

                offset = offset + limit;

                $(container).append(data.html).data('items', offset);

                if(data.total > $(container).find('> div').size()) {
                    btn.removeClass('u-isHidden');
                }

                loader.addClass('u-isHidden');

            }

        });

    });




})(jQuery, window);
