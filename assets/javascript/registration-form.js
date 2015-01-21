(function($) {

    $('input, select').on('keyup', function() {

        /** Form validation **/

        var spanError = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
        var spanSuccess = '<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>';
        var passwordAlert = '<div class="password-alert alert alert-danger" role="alert">Passwords must to match</div>';

        /** check that passwords match */

        // passwords exist but do not match
        if (
            $('#password').val() != $('#password-confirmation').val()
            && $('#password-confirmation').val()
            && $('#password').val()
        ) {
            $('.form-control-feedback').remove();
            $('div.password-alert').remove();

            $('#password').parent('.form-group').addClass('has-error');
            $('#password-confirmation').parent('.form-group').addClass('has-error');
            $('#password').after(spanError);
            $('#password-confirmation').after(spanError);

            $('.registration-next').addClass('disabled');

            $('#password').parents('.row').after(passwordAlert);

        // Passwords match and values arent null
        } else if (
            $('#password').val() == $('#password-confirmation').val()
            && $('#password-confirmation').val()
            && $('#password').val()
        ) {
            $('input[type="password"]').parent('.form-group').removeClass('has-error');
            $('.form-control-feedback').remove();
            $('div.password-alert').remove();

            $('input[type="password"]').parent('.form-group').addClass('has-success');
            $('#password').after(spanSuccess);
            $('#password-confirmation').after(spanSuccess);

            $('.registration-next').removeClass('disabled');

        // or else
        } else {
            $('input[type="password"]').parent('.form-group').removeClass('has-error');
            $('input[type="password"]').parent('.form-group').removeClass('has-success');
            $('.form-control-feedback').remove();
            $('div.password-alert').remove();

            $('.registration-next').addClass('disabled');
        }
    });

    /** Carousel **/
    $('.registration-prev, .register').hide();

    $('#carousel-register').carousel({
        interval: false,
        wrap: false
    });

    checkRequired($('#carousel-register .item.active'));

    $('#carousel-register').on('slid.bs.carousel', function(e) {
        checkRequired($('#carousel-register .item.active'));
    });

    $('#carousel-register').on('slide.bs.carousel', function(e) {
        $('.registration-next').addClass('disabled');
    });

    function checkRequired(obj) {

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

        if (!obj.find('div.is-required').length) {
            $('.registration-next').removeClass('disabled');
            return;
        }

        obj.find('input, select').on('keyup, change', function(e) {
            var requiredFieldsComplete = false;

            $('#carousel-register .item.active').find('div.is-required').each(function(i) {
                var inputValue = $(this).find('input, select').val();

                if (!inputValue) {
                    requiredFieldsComplete = false
                    return false;
                }

                requiredFieldsComplete = true;
                
            });

            if (requiredFieldsComplete) {
                $('.registration-next').removeClass('disabled');
            } else {
                $('.registration-next').addClass('disabled');
            }
        });
    }

    // Make avatars selectable
    $('.selectable').selectable({
        selected: function( event, ui ) {
            var fileName = $(ui.selected).find('img').attr('src');
            $('#avatar').val(fileName);
            $('.registration-next').removeClass('disabled');
        }
    });


})(jQuery);