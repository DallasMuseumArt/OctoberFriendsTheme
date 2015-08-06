(function($) {

    /** Carousel **/
    $('.registration-prev, .registration-next, .register').hide();

    $('#carousel-register').carousel({
        interval: false,
        wrap: false
    });

    $('#carousel-register').on('slid.bs.carousel', function(e) {
        checkButtons($('#carousel-register .item.active'));
    });

    $('.login-box .member').click(function(e) {
        e.preventDefault();
        window.location = '/verify-membership';
    });

    $('.login-box .non-member').click(function(e) {
        e.preventDefault();
        $('#carousel-register').carousel('next');
        
    });

    $('.registration-next').click(function(e) {
        $("html, body").animate({
            scrollTop:0
        },"fast");
        validateForm(e);	
    });

    // Disable continue button on click
    $('.registration-next').click(function() {
        $(this).attr('disabled', 'disabled');
    });

    $('.register').click(function() {
        $('#status').fadeIn();
        $('#preloader').fadeIn('slow');
    });

    $('form').on('keyup', function() {
        $('.registration-next').removeAttr('disabled');
    });

    function validateForm(e) {
        var idx = $('.item.active').index();

        $('#register').parsley()
            .asyncValidate('block' + (idx - 1))
            .done(function() {
                // Group validation was successful
                $('#carousel-register').carousel('next');
            }); 
        $(this).attr('disabled', 'disabled');
    }

    function checkButtons(obj) {
        $('.registration-next').removeAttr('disabled');

        var idx = $('.item.active').index();

        if (idx > 0 && idx != 6) {
            $('.registration-prev').show();
            $('.registration-next').show();
        } else if (idx == 6) {
            $('.registration-prev').show();
            $('.registration-next').hide();
            $('.register').show();
        } else {
            $('.registration-prev').hide();
            $('.registration-next').hide();
            $('.register').hide();
            $('.cancel').show();
        }
    
    }

    // Make avatars selectable
    $('.selectable').selectable({
        selected: function( event, ui ) {
            var fileName = $(ui.selected).find('img').attr('src');
            $('#avatar').val(fileName);
            $('.registration-next').removeAttr('disabled');
        }
    });

    // Custom Parsley validator
    ParsleyExtend.addAsyncValidator('validateUsername', function (xhr) {
    	// Ideally the validation should be base on HTTP codes 200 and 404
    	// But OctoberCMS framework always return 200. Throwing exceptions generated
    	// a HTTP code 500 and during my test this causes a strange behaivor in parsley  
    	return xhr.responseJSON['available'];
    }); 
      

})(jQuery);
