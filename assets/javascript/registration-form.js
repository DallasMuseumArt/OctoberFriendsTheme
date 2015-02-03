(function($) {

    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too premptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
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
        $('.registration-next').addClass('disabled');
        checkRequired($('#carousel-register .item.active'));

        if (e.direction == 'right' && false !== $('#register').parsley().validate('block' + $('.item.active').index())) {
            $('.registration-next').removeClass('disabled');
        }
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

        if (obj.find('div.is-required').length === 0) {
            $('.registration-next').removeClass('disabled');
            return;
        }

        obj.find('input, select').donetyping(function(e) {
            var requiredFieldsComplete = false;

            if (false !== $('#register').parsley().validate('block' + idx)) {
                requiredFieldsComplete = true;
            }

            if (requiredFieldsComplete) {
                $('.registration-next').removeClass('disabled');
            } else {
                $('.registration-next').addClass('disabled');
            }
        }, 2000);
    
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