(function($) {

    /** Carousel **/
    $('.registration-prev, .register').hide();

    $('#carousel-register').carousel({
        interval: false,
        wrap: false
    });

    checkButtons($('#carousel-register .item.active'));

    $('#carousel-register').on('slid.bs.carousel', function(e) {
        checkButtons($('#carousel-register .item.active'));

    });

    $('.registration-next').click(function(e) {
        var idx = $('.item.active').index();
        return $('#register').parsley().validate('block' + idx);
    })

    function checkButtons(obj) {

        var idx = $('.item.active').index();

        if (idx > 0) {
            $('.registration-prev').show();
        } else {
            $('.registration-prev').hide();
        }

        if (idx == 6) {
            $('.registration-next').hide();
            $('.register').show();
        } else {
            $('.register').hide();
            $('.registration-next').show();
        }
    
    }

    // Make avatars selectable
    $('.selectable').selectable({
        selected: function( event, ui ) {
            var fileName = $(ui.selected).find('img').attr('src');
            $('#avatar').val(fileName);
        }
    });


})(jQuery);